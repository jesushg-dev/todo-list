
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

import { itemsApi, useGetElementsQuery } from './api';

describe('itemsApi', () => {
  it('is defined with correct reducer path', () => {
    expect(itemsApi.reducerPath).toBe('itemsApi');
  });

  it('exports hooks', () => {
    expect(useGetElementsQuery).toBeDefined();
  });

  it('exports correctly getElements endpoint', () => {
    const endpoint = itemsApi.endpoints.getElements as any;
    expect(endpoint.query()).toBe('elements');
  });
});
