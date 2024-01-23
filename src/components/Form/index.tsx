import {
  Form as AntdForm,
  FormInstance,
  FormProps
} from 'antd';
import {
  ReactNode,
  Ref
} from 'react';

type TFormProps = JSX.IntrinsicAttributes &
FormProps<any> & { children?: ReactNode } & { ref?: Ref<FormInstance<any>> | undefined };

export const Form = (props: TFormProps): JSX.Element => <AntdForm {...props} />;
