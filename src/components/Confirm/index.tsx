import {
  Popconfirm,
  PopconfirmProps
} from 'antd';

export const Confirm = (props: PopconfirmProps): JSX.Element => (
  <Popconfirm okText="Yes" cancelText="No" {...props} />
);
