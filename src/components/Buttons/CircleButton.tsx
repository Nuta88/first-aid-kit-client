import { Button } from 'antd';

import { ButtonProps } from './types';

export const CircleButton = (
  props: ButtonProps
): JSX.Element => (
  <Button shape="circle" type="default" {...props} />
);
