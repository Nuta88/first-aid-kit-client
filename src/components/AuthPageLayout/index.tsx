import { Outlet, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../hooks';
import { Card } from '../Card';
import { Col } from '../Col';
import { Row } from '../Row';

const CardStyled = styled(Card)`
  margin: 1rem 2rem;
  padding: 0 .5rem;
  .ant-card-body {
    height: 100%;
    width:100%;
  }
`;

const RowStyled = styled(Row)`
  height: 100vh;
`;

const ColStyled = styled(Col)`
  height: 80%;
`;

export const AuthPageLayout = (): JSX.Element => {
  const { isUserAuthorized } = useAuth();

  if (isUserAuthorized) return <Navigate to="/" />;

  return (
    <RowStyled justify="center" align="middle">
      <ColStyled lg={12} xs={24}>
        <CardStyled>
          <Outlet />
        </CardStyled>
      </ColStyled>
    </RowStyled>
  );
};
