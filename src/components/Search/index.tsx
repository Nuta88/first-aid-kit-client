import {
  Input,
  InputProps,
  InputRef
} from 'antd';
import { RefAttributes } from 'react';

const { Search: AntdSearch } = Input;

export const Search = (props: JSX.IntrinsicAttributes & InputProps & RefAttributes<InputRef>): JSX.Element => (
  <AntdSearch {...props} />
);
