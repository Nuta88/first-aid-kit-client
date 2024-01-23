import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  act,
  render
} from '@testing-library/react';
import {
  ReactElement,
  ReactNode
} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './store/store';

export async function renderWithProviders (Component: ReactElement, isRenderWithoutRouter?: boolean): Promise<any> {
  setupListeners(store.dispatch);

  function Wrapper ({ children }: { children: ReactNode }): JSX.Element {
    if (isRenderWithoutRouter ?? false) {
      return <Provider store={store}>{children}</Provider>;
    }

    return (
        <Provider store={store}>
          <Router>{children}</Router>
        </Provider>
    );
  }

  return await act(async () => ({ store, ...render(Component, { wrapper: Wrapper }) }));
}
