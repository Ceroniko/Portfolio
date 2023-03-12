import { FC } from 'react';
import type { IButtonProps } from './Button.props';

const Button: FC<IButtonProps> = (props) => {
  return <button {...props} />;
};

export { Button };
