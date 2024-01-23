import { Button } from 'antd';
import styled from 'styled-components';

import { ButtonProps } from './types';

const ButtonStyled = styled(Button)`
  width: 100%;
`;

export const SubmitButton = (
  props: ButtonProps
): JSX.Element => (
  <ButtonStyled type="primary" htmlType="submit" size="large" {...props} />
);
