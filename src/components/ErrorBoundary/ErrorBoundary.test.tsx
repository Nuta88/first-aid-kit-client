import {
  render,
  screen
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: () => ({})
}));

describe('Error Boundary tests', () => {
  test('should render default Error Boundary', async () => {
    render(<ErrorBoundary />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('error-content')).toBeInTheDocument();
    expect(screen.getByTestId('error-title')).toHaveTextContent('Something went wrong');
  });
});
