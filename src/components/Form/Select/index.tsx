import {
  Select as SimpleSelect,
  SelectProps
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';

export const { Option: SelectOption } = SimpleSelect;

export const Select = (props: JSX.IntrinsicAttributes & SelectProps<any, DefaultOptionType>): JSX.Element => (
  <SimpleSelect { ...props } />
);
