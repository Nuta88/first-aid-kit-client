import {
  fireEvent,
  screen,
  waitFor
} from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';

import Page from './index';

const onBackMock = jest.fn();
describe('Page tests', () => {
  test('should return to previous page', async () => {
    await renderWithProviders(
      <Page
        extra={[]}
        onBack={onBackMock}
        isBack
      >
          <div>Page content</div>
      </Page>
    );

    await waitFor(() => {
      expect(screen.getByTestId('page-back-icon')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('page-back-icon'));
    });
  });
  test('should go back', async () => {
    await renderWithProviders(
      <Page
        extra={[]}
        isBack
      >
          <div>Page content</div>
      </Page>
    );

    await waitFor(() => {
      expect(screen.getByTestId('page-back-icon')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('page-back-icon'));
    });
  });
});
