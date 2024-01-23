import {
  Input,
  InputProps,
  InputRef
} from 'antd';
import { RefAttributes } from 'react';

const TextInput = (props: JSX.IntrinsicAttributes & InputProps & RefAttributes<InputRef>): JSX.Element => (
  <Input {...props} />
);

export default TextInput;
