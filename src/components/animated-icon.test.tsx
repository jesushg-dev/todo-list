import renderer from 'react-test-renderer';
import { AnimatedIcon, AnimatedSplashOverlay } from './animated-icon';

jest.mock('expo-image', () => ({
  Image: 'Image'
}));

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (comp: any) => comp },
    Keyframe: class {
      duration() { return this; }
      withCallback(cb: any) {
        setTimeout(() => cb(true), 0);
        return this;
      }
    },
    Easing: { elastic: jest.fn() },
  };
});

jest.mock('react-native-worklets', () => ({
  scheduleOnRN: (fn: any, arg: any) => fn(arg),
}));

describe('Animated Icons', () => {
  it('renders AnimatedIcon', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<AnimatedIcon />);
    });
    expect(component.toJSON()).toBeTruthy();
  });

  it('renders AnimatedSplashOverlay and unmounts on finish', async () => {
    jest.useFakeTimers();
    let component: any;
    renderer.act(() => {
      component = renderer.create(<AnimatedSplashOverlay />);
    });
    expect(component.toJSON()).toBeTruthy();

    // Fast forward to trigger callback
    await renderer.act(async () => {
      jest.runAllTimers();
    });

    // Component should unmount (return null) after callback
    expect(component.toJSON()).toBeNull();
    jest.useRealTimers();
  });
});
