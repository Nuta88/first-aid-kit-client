import { Layout } from 'antd';
import {
  Navigate,
  Outlet
} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from "../../hooks";

import Header from './Header';

const { Content } = Layout;

const ContentStyled = styled(Content)`
  height: calc(100vh - 5.2rem);
  overflow: hidden;
  margin-top: 3.75rem;
  padding: 1rem 1.2rem;
`;

const PageLayout = (): JSX.Element => {
  const { isUserAuthorized, isAuthorizedPaths } = useAuth();
  
  if (!isUserAuthorized && !isAuthorizedPaths) return <Navigate to="/login" />;
  
  return (
    <>
      <Header />
      <ContentStyled data-testid="layout-content">
        <Outlet />
      </ContentStyled>
    </>
  );
};

export default PageLayout;
