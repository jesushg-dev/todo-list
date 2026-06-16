import { Colors } from '@/constants/theme';
import { useColorScheme } from './use-color-scheme';
import { useTheme } from './use-theme';

jest.unmock('./use-theme');

jest.mock('./use-color-scheme', () => ({
  useColorScheme: jest.fn(),
}));

describe('useTheme hook', () => {
  it('returns light theme when color scheme is light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    expect(useTheme()).toEqual(Colors.light);
  });

  it('returns dark theme when color scheme is dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    expect(useTheme()).toEqual(Colors.dark);
  });

  it('returns light theme when color scheme is unspecified', () => {
    (useColorScheme as jest.Mock).mockReturnValue('unspecified');
    expect(useTheme()).toEqual(Colors.light);
  });
});
