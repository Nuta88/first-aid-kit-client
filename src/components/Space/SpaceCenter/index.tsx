import {
  Space,
  SpaceProps
} from 'antd';
import styled from 'styled-components';

const SpaceStyled = styled(Space)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export const SpaceCenter = (props: JSX.IntrinsicAttributes & SpaceProps): JSX.Element => <SpaceStyled {...props} />;
