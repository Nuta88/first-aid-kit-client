import {
  Input,
  InputProps,
  InputRef
} from 'antd';
import { PasswordProps } from 'antd/es/input';
import { RefAttributes } from 'react';

const { Password } = Input;

const PasswordInput = (props: JSX.IntrinsicAttributes & InputProps & PasswordProps & RefAttributes<InputRef>): JSX.Element => (
  <Password {...props} />
);

export default PasswordInput;
