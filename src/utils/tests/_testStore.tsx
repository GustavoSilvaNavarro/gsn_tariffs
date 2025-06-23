import React, { type JSX, type PropsWithChildren } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { genabilitySlice } from '@/state/genability/genabilitySlice';

const rootReducer = combineReducers({
  [genabilitySlice.reducerPath]: genabilitySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(genabilitySlice.middleware),
    devTools: false,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => <Provider store={store}>{children}</Provider>;
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
