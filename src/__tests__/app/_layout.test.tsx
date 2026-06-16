import * as ReactNative from 'react-native';
import renderer from 'react-test-renderer';
import RootLayout from '../../../app/_layout';

jest.mock('expo-router', () => ({
  Stack: Object.assign(({ children }: any) => children, { Screen: () => null }),
  ThemeProvider: ({ children }: any) => children,
  DarkTheme: 'DarkTheme',
  DefaultTheme: 'DefaultTheme',
}));
jest.mock('react-redux', () => ({
  Provider: ({ children }: any) => children,
}));
jest.mock('@/components/animated-icon', () => ({
  AnimatedSplashOverlay: 'AnimatedSplashOverlay',
}));
jest.mock('../../../store/store', () => ({
  store: {},
}));

describe('RootLayout', () => {
  let useColorSchemeSpy: any;

  beforeEach(() => {
    useColorSchemeSpy = jest.spyOn(ReactNative, 'useColorScheme');
  });

  afterEach(() => {
    useColorSchemeSpy.mockRestore();
  });

  it('renders correctly with light theme', () => {
    useColorSchemeSpy.mockReturnValue('light');
    let component: any;
    renderer.act(() => {
      component = renderer.create(<RootLayout />);
    });
    expect(component.toJSON()).toBeTruthy();
  });

  it('renders correctly with dark theme', () => {
    useColorSchemeSpy.mockReturnValue('dark');
    let component: any;
    renderer.act(() => {
      component = renderer.create(<RootLayout />);
    });
    expect(component.toJSON()).toBeTruthy();
  });
});
