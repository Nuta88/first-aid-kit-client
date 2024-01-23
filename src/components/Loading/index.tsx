import {
  Spin,
  SpinProps
} from 'antd';
import styled from 'styled-components';

const SpinStyled = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Loading = (props: JSX.IntrinsicAttributes & SpinProps): JSX.Element => (
  <SpinStyled tip="Loading" size="large" {...props} />
);
