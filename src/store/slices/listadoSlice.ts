import { createSlice } from '@reduxjs/toolkit';
import { RemoteElement } from '../../types';

interface ListadoState {
  items: RemoteElement[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ListadoState = {
  items: [],
  status: 'idle',
  error: null,
};

const listadoSlice = createSlice({
  name: 'listado',
  initialState,
  reducers: {},
});

export default listadoSlice.reducer;
export type { ListadoState };
