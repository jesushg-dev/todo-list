
jest.mock('@reduxjs/toolkit/query/react', () => ({
  createApi: jest.fn().mockImplementation((options) => {
    const builder = { query: (config: any) => config };
    const endpoints = options.endpoints(builder);
    return {
      reducerPath: 'itemsApi',
      reducer: jest.fn(() => ({})),
      middleware: jest.fn(() => (next: any) => (action: any) => next(action)),
      endpoints,
      useGetElementsQuery: jest.fn(),
    };
  }),
  fetchBaseQuery: jest.fn(),
}));

import { store } from './store';

describe('store', () => {
  it('is configured correctly', () => {
    expect(store.getState()).toBeDefined();
    expect(store.dispatch).toBeDefined();
  });
});
