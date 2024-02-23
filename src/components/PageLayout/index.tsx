import { Layout } from 'antd';
import { useMemo } from "react";
import {
  Navigate,
  Outlet
} from 'react-router-dom';
import styled from 'styled-components';
import { MessageContext } from '../../context';
import { useAuth } from '../../hooks';
import { useMessage } from './hooks/useMessage';
import { useNotification } from './hooks/useNotification';

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
  const { messageContext, onSuccess, onError, onWarning } = useMessage();
  const { notificationContext, openTopRightNotification } = useNotification();
  
  const contextValue = useMemo(() => ({
    onSuccess, onError, onWarning, openTopRightNotification
  }), [onSuccess, onError, onWarning,openTopRightNotification]);
  
  if (!isUserAuthorized && !isAuthorizedPaths) return <Navigate to="/login" />;
  
  return (
    <MessageContext.Provider value={contextValue}>
      {notificationContext}
      {messageContext}
      <Header />
      <ContentStyled data-testid="layout-content">
        <Outlet />
      </ContentStyled>
    </MessageContext.Provider>
  );
};

export default PageLayout;
