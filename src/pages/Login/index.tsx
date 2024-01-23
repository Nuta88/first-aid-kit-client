import { Form } from 'antd';

import {
  AuthForm,
  TextInput,
  AvatarIcon,
  LockIcon
} from '../../components';
import PasswordInput from '../../components/Form/Input/PasswordInput';
import { useAuth } from '../../hooks';

const Login = (): JSX.Element => {
  const { onLogin } = useAuth();

  return (
    <AuthForm
      title="Login"
      redirectTitle="Or register now!"
      redirectTo="/register"
      onSave={onLogin}
    >
      <Form.Item
        name="email"
        rules={[ { required: true, message: 'Please input your email!' } ]}>
        <TextInput placeholder="Username" size="large" prefix={<AvatarIcon />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[ { required: true, message: 'Please input your Password!' } ]}
      >
        <PasswordInput
          size="large"
          prefix={<LockIcon />}
          placeholder="Password"
        />
      </Form.Item>
    </AuthForm>
  );
};

export default Login;
