import { configureStore } from '@reduxjs/toolkit';
import { listadoApi } from '../services/api';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    [listadoApi.reducerPath]: listadoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listadoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
