import {
  Col as AntdCol,
  ColProps
} from 'antd';
import { RefAttributes } from 'react';

export const Col = (props: JSX.IntrinsicAttributes & ColProps & RefAttributes<HTMLDivElement>): JSX.Element => (
  <AntdCol {...props} />
);
