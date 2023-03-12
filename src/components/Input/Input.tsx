import { FC } from 'react';
import type { IInputProps } from './Input.props';

const Input: FC<IInputProps> = (props) => {
  return <input {...props} />;
};

export { Input };
