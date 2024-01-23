import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import { RefAttributes } from 'react';

const { Text } = Typography;

export const SecondaryText = (props: JSX.IntrinsicAttributes & TextProps & RefAttributes<HTMLSpanElement>): JSX.Element => (
  <Text type="secondary" {...props} />
);
