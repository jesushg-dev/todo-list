import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { itemsApi } from '../services/api';
import tasksReducer from './slices/tasksSlice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  [itemsApi.reducerPath]: itemsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(itemsApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
