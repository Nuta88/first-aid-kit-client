import { ReactNode } from 'react';

import { CircleButton } from './CircleButton';
import { ButtonProps } from './types';

interface IconButtonProps {
  icon: ReactNode
}

export const IconButton = ({ icon, ...props }: IconButtonProps & ButtonProps): JSX.Element => (
  <CircleButton icon={icon} {...props} />
);
