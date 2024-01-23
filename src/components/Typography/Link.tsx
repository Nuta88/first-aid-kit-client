import { Typography } from 'antd';
import { LinkProps } from 'antd/es/typography/Link';
import { RefAttributes } from 'react';

const { Link: AntdLink } = Typography;

export const Link = (props: JSX.IntrinsicAttributes & LinkProps & RefAttributes<HTMLElement>): JSX.Element => (
  <AntdLink {...props} />
);
