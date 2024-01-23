import { BaseButtonProps } from 'antd/es/button/button';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  RefAttributes
} from 'react';

export type ButtonProps = JSX.IntrinsicAttributes &
Partial<{ href: string; target?: string | undefined; onClick?: MouseEventHandler<HTMLElement> | undefined } &
BaseButtonProps &
Omit<AnchorHTMLAttributes<any>, 'type' | 'onClick'> &
{ htmlType?: 'button' | 'submit' | 'reset' | undefined; onClick?: MouseEventHandler<HTMLElement> | undefined } &
Omit<ButtonHTMLAttributes<any>, 'type' | 'onClick'>> & RefAttributes<HTMLElement>;
