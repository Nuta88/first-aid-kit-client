import type { MenuProps } from 'antd';
import { Dropdown as DropdownAntd } from 'antd';
import { ReactNode } from 'react';

interface IDropdown {
  children: ReactNode;
  items: MenuProps['items']
}

export const Dropdown = ({ items, ...rest }: IDropdown): JSX.Element => (
  <DropdownAntd menu={{ items }} placement="bottom" {...rest} trigger={[ 'click' ]} />
);
