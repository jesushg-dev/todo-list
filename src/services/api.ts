import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RemoteElement } from '../types';

export const listadoApi = createApi({
  reducerPath: 'listadoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getElements: builder.query<RemoteElement[], void>({
      query: () => 'elements',
    }),
  }),
});

export const { useGetElementsQuery } = listadoApi;
