import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import {
  ErrorBoundary,
  PageLayout
} from '../components';

const Home = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Home'));

const routers = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/:tab',
        element: <Home />
      },
      {
        path: '/',
        element: <Home />
      }
    ]
  },
]);

const AppRouters = (): JSX.Element => (
  <RouterProvider router={routers} />
);

export default AppRouters;
