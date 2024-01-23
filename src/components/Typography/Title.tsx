import { Typography } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import { RefAttributes } from 'react';

const { Title: AntdTitle } = Typography;

export const Title = (props: JSX.IntrinsicAttributes & TitleProps & RefAttributes<HTMLElement>): JSX.Element => (
  <AntdTitle level={2} {...props} />
);
