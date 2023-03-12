#! /usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');

const options = yargs.option('n', { alias: 'name', describe: 'Name of the component', type: 'string', demandOption: false }).help(true).argv;

const args = yargs.argv;
// @ts-ignore
const componentName = args.name;

if (!componentName) {
  console.log('Please provide a valid name for component');
  yargs.showHelp();
  process.exit();
}

const pascalCaseComponentName = componentName[0].toUpperCase() + componentName.slice(1);
const componentPath = path.resolve(__dirname, `../src/components/${pascalCaseComponentName}`);
const isComponentExist = fs.existsSync(componentPath);

if (isComponentExist) {
  console.log('This component already exists');
  process.exit();
}

const componentTemplate = `import { FC } from 'react';
import type { I${pascalCaseComponentName}Props } from './${pascalCaseComponentName}.props';

const ${pascalCaseComponentName}: FC<I${pascalCaseComponentName}Props> = (props) => {
  return <div>${pascalCaseComponentName}</div>;
};

export { ${pascalCaseComponentName} };
`;

const componentPropsTemplate = `interface I${pascalCaseComponentName}Props {}

export type { I${pascalCaseComponentName}Props };
`;

const indexTemplate = `export * from './${pascalCaseComponentName}';
export * from './${pascalCaseComponentName}.props';
`;

const componentFilePath = `${componentPath}/${pascalCaseComponentName}.tsx`;
const componentPropsFilePath = `${componentPath}/${pascalCaseComponentName}.props.ts`;
const indexFilePath = `${componentPath}/index.ts`;

fs.mkdir(componentPath, () => {
  fs.writeFile(componentFilePath, componentTemplate, () => void 0);
  fs.writeFile(componentPropsFilePath, componentPropsTemplate, () => void 0);
  fs.writeFile(indexFilePath, indexTemplate, () => void 0);
});
