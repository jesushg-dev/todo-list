import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import renderer from 'react-test-renderer';
import HomeScreen from '../../../app/index';

jest.mock('expo-router', () => ({
  router: { push: jest.fn() }
}));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children
}));
jest.mock('@/components/animated-icon', () => ({
  AnimatedIcon: 'AnimatedIcon'
}));
describe('HomeScreen', () => {
  it('renders correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<HomeScreen />);
    });
    expect(component.toJSON()).toBeTruthy();
  });

  it('navigates to tasks when Tasks button is pressed', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<HomeScreen />);
    });
    const buttons = component.root.findAllByType(Button);
    renderer.act(() => {
      buttons[0].props.onPress();
    });
    expect(router.push).toHaveBeenCalledWith('/tasks');
  });

  it('navigates to items when List button is pressed', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<HomeScreen />);
    });
    const buttons = component.root.findAllByType(Button);
    renderer.act(() => {
      buttons[1].props.onPress();
    });
    expect(router.push).toHaveBeenCalledWith('/listado');
  });
});
