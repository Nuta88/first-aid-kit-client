import {
  screen,
  waitFor
} from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';

import PageLayout from './index';

describe('PageLayout tests', () => {
  test('should render lazy component', async () => {
    await renderWithProviders(<PageLayout/>);
    await waitFor(() => {
      expect(screen.getByTestId('layout-content')).toBeInTheDocument();
    });
  });
});
