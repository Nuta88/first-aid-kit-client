import {
  Row as AntdRow,
  RowProps
} from 'antd';
import { RefAttributes } from 'react';

export const Row = (props: JSX.IntrinsicAttributes & RowProps & RefAttributes<HTMLDivElement>): JSX.Element => (
  <AntdRow {...props} />
);
