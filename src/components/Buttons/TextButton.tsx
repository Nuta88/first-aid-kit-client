import { Button } from './index';
import { ButtonProps } from './types';

export const TextButton = (
  props: ButtonProps
): JSX.Element => (
  <Button type="text" {...props} />
);
