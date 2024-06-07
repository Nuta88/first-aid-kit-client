import {
  Space,
  SpaceProps
} from 'antd';
import styled from 'styled-components';

const SpaceStyled = styled(Space)`
  display: flex;
  justify-content: space-around;
`;

export const SpaceAround = (props: JSX.IntrinsicAttributes & SpaceProps): JSX.Element => <SpaceStyled {...props} />;
