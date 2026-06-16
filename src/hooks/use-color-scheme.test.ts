import { useColorScheme } from './use-color-scheme';

jest.unmock('./use-color-scheme');

describe('useColorScheme', () => {
  it('exports correctly', () => {
    expect(useColorScheme).toBeDefined();
  });
});
