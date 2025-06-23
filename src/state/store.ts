import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import utilityReducer from './tariffs/utilitySlice';
import { postSlice } from './posts/postsApiSlice';
import { genabilitySlice } from './genability/genabilitySlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  utilityData: utilityReducer,
  [postSlice.reducerPath]: postSlice.reducer,
  [genabilitySlice.reducerPath]: genabilitySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postSlice.middleware).concat(genabilitySlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
