import {
  Space,
  SpaceProps
} from 'antd';
import styled from 'styled-components';

const SpaceStyled = styled(Space)`
  display: inline-flex;
  align-items: center;
  font-size: .94rem;
`;

export const InlineCenter = (props: JSX.IntrinsicAttributes & SpaceProps): JSX.Element => <SpaceStyled {...props} />;
