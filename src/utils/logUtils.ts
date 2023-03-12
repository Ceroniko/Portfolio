const styles = {
  error: `
    color: black;
    background-color: #FF3333;
  `,
};

const logUtils = {
  error(
    error: unknown,
    userMessage: string,
    ...args: (string | number)[]
  ) {
    const message = '%c' + userMessage;
    console.log(message, styles.error, ...args);
  },
};

export { logUtils };
