import { Form } from 'antd';

import {
  AuthForm,
  TextInput,
  PasswordInput,
  AvatarIcon,
  LockIcon,
  MailIcon
} from '../../components';
import { useAuth } from '../../hooks';
import { User } from "../../types/user";

type TRegister = Omit<User, 'id'>;

const Register = (): JSX.Element => {
  const { onRegister } = useAuth<TRegister>();

  return (
    <AuthForm
      title="Register"
      redirectTitle="Back to login page"
      redirectTo="/login"
      onSave={onRegister}
    >
      <Form.Item
        name="first_name"
        rules={[ { required: true, message: 'Please input your first name!' } ]}>
        <TextInput
          size="large"
          placeholder="First name"
          prefix={<AvatarIcon />}
        />
      </Form.Item>
      <Form.Item
        name="last_name"
        rules={[ { required: true, message: 'Please input your last name!' } ]}>
        <TextInput
          size="large"
          placeholder="Last name"
          prefix={<AvatarIcon />}
        />
      </Form.Item>
      <Form.Item name="email" rules={[ { required: true, type: 'email' } ]}>
        <TextInput
          placeholder="Email"
          size="large"
          prefix={<MailIcon />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[ { required: true, message: 'Please input your Password!' } ]}
      >
        <PasswordInput
          type="password"
          size="large"
          prefix={<LockIcon />}
          placeholder="Password"
        />
      </Form.Item>
    </AuthForm>
  );
};

export default Register;
