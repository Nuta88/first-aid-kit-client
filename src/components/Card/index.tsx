import {
  Card as AntdCard,
  CardProps
} from 'antd';

export const Card = (props: CardProps): JSX.Element => (
  <AntdCard {...props} />
);
