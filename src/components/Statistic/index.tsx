import {
  Statistic as AntdStatistic,
  StatisticProps
} from 'antd';

export const Statistic = (props: StatisticProps): JSX.Element => (
  <AntdStatistic {...props} />
);
