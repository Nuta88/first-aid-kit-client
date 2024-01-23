import { Form } from 'antd';
import { ReactNode, FC } from 'react';
import styled from 'styled-components';

import { colors } from '../../../assets/colors';
import { SubmitButton } from '../../Buttons/SubmitButton';
import { Link } from '../../Typography/Link';
import { Title } from '../../Typography/Title';

const TitleStyled = styled(Title)`
  margin: 0 0 1rem;
  font-size: 20px;
  text-align: center;
  color: ${colors.primaryText}!important;
`;

const ButtonStyled = styled(SubmitButton)`
  margin-bottom: 1rem;
`;

const LinkStyled = styled(Link)`
  color: ${colors.primaryText}!important;
  font-weight: 600;
`;

interface IPageProps {
  title: string | ReactNode;
  redirectTitle: string;
  redirectTo: string;
  children: ReactNode;
  onSave: (user: any) => void
}

export const AuthForm: FC<IPageProps> = ({
  title,
  redirectTitle,
  redirectTo,
  onSave,
  children
}) => {
  const [ form ] = Form.useForm();

  return (
    <>
      <TitleStyled>
        {title}
      </TitleStyled>
      <Form
        form={form}
        onFinish={onSave}
        name="auth"
        autoComplete="off"
      >
        {children}
        <Form.Item>
          <ButtonStyled>
            Submit
          </ButtonStyled>
          <LinkStyled href={redirectTo}>
            {redirectTitle}
          </LinkStyled>
        </Form.Item>
      </Form>
    </>
  );
};
