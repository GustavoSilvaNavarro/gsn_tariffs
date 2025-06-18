import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import utilityReducer from './tariffs/utilitySlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  utilityData: utilityReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
