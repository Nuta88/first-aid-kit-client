import {
  Empty,
  EmptyProps
} from 'antd';
import styled from 'styled-components';

export const EmptyStyled = styled(Empty)`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const EmptyData = (props: JSX.IntrinsicAttributes & EmptyProps): JSX.Element => <EmptyStyled {...props} />;
