
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../store/store';
import { setupStore } from '../store/store';

interface ExtendedRenderOptions {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, Wrapper, ui: <Wrapper>{ui}</Wrapper> };
}
