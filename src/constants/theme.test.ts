import { Fonts, Colors, Spacing } from './theme';

describe('theme', () => {
  it('exports Fonts, Colors, Spacing correctly', () => {
    expect(Fonts).toBeDefined();
    expect(Colors).toBeDefined();
    expect(Spacing).toBeDefined();
  });
});
