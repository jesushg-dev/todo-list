import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import listadoReducer from './slices/listadoSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    listado: listadoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
