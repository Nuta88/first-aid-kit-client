import {
  Space,
  SpaceProps
} from 'antd';
import styled from 'styled-components';

const SpaceStyled = styled(Space)`
  display: flex;
  justify-content: space-between;
`;

export const SpaceBetween = (props: JSX.IntrinsicAttributes & SpaceProps): JSX.Element => <SpaceStyled {...props} />;
