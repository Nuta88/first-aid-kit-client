import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import {
  AuthPageLayout,
  ErrorBoundary,
  PageLayout
} from '../components';

const Audit = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Audit'));
const Home = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Home'));
const Category = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Category'));
const Login = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Login'));
const Register = lazy(async (): Promise<{ readonly default: () => JSX.Element }> => await import('../pages/Register'));

const routers = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      
      {
        path: '/',
        element: <Navigate to="/medicine" replace />
      },
      {
        path: 'medicine',
        element: <Home />
      },
      {
        path: 'medicine/:tab',
        element: <Home />
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'audit',
        element: <Audit />
      },
    ]
  },
  {
    element: <AuthPageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
]);

const AppRouters = (): JSX.Element => (
  <RouterProvider router={routers} />
);

export default AppRouters;
