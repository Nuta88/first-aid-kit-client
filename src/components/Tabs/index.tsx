import {
  Tabs as AntdTabs,
  TabsProps
} from 'antd';
import { RefAttributes } from 'react';

export const Tabs = (props: JSX.IntrinsicAttributes & (TabsProps & RefAttributes<unknown>)): JSX.Element => (
  <AntdTabs {...props} />
);
