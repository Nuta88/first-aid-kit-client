import {
  Checkbox as AntdCheckbox,
  CheckboxProps,
  CheckboxRef
} from 'antd';
import * as React from "react";

export const Checkbox = (props: JSX.IntrinsicAttributes & CheckboxProps & React.RefAttributes<CheckboxRef>): JSX.Element => (
  <AntdCheckbox {...props} />
);
