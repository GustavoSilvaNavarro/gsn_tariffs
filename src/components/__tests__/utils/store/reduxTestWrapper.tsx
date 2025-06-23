import type { ReactNode, FC } from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { genabilitySlice } from '@/state/genability/genabilitySlice';

const testRootReducer = combineReducers({
  [genabilitySlice.reducerPath]: genabilitySlice.reducer,
});

export type TestRootState = ReturnType<typeof testRootReducer>;
export type TestAppStore = ReturnType<typeof createTestStore>;
export type TestAppDispatch = TestAppStore['dispatch'];

const createTestStore = (preloadedState: Partial<TestRootState> = {}) => {
  return configureStore({
    reducer: testRootReducer,
    preloadedState: preloadedState as TestRootState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(genabilitySlice.middleware),
  });
};

export interface ReduxTestWrapperProps {
  children: ReactNode;
  preloadedState?: Partial<TestRootState>;
}

/**
 * Wraps children with a Redux Provider using a fresh test store instance.
 * Optionally accepts preloadedState for custom initial state.
 */
export const ReduxTestWrapper: FC<ReduxTestWrapperProps> = ({ children, preloadedState }) => {
  const store = createTestStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
};
