import {
  isRouteErrorResponse,
  useRouteError
} from 'react-router-dom';

import {
  SecondaryText,
  SpaceCenter,
  Title
} from '../index';

import PageNotFound from './PageNotFound';

const ErrorBoundary = (): JSX.Element => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <PageNotFound />;
    }
  }

  return (
    <SpaceCenter data-testid="error-content">
      <Title data-testid="error-title">Something went wrong</Title>
      <SecondaryText>Reload page</SecondaryText>
    </SpaceCenter>
  );
};

export default ErrorBoundary;
