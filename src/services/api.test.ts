
jest.mock('@reduxjs/toolkit/query/react', () => ({
  createApi: jest.fn().mockImplementation((options) => {
    const builder = { query: (config: any) => config };
    const endpoints = options.endpoints(builder);
    return {
      reducerPath: options.reducerPath,
      endpoints,
      useGetElementsQuery: jest.fn(),
    };
  }),
  fetchBaseQuery: jest.fn(),
}));

import { listadoApi, useGetElementsQuery } from './api';

describe('listadoApi', () => {
  it('is defined with correct reducer path', () => {
    expect(listadoApi.reducerPath).toBe('listadoApi');
  });

  it('exports hooks', () => {
    expect(useGetElementsQuery).toBeDefined();
  });

  it('has getElements endpoint that queries elements', () => {
    const endpoint = listadoApi.endpoints.getElements as any;
    expect(endpoint.query()).toBe('elements');
  });
});
