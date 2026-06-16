import { Animated } from 'react-native';
import renderer from 'react-test-renderer';
import Skeleton from './Skeleton';

describe('Skeleton Component', () => {
  it('renders correctly with default props', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Skeleton width={100} height={20} />);
    });

    const view = component.root.findByType(Animated.View);
    expect(view.props.style[0].width).toBe(100);
    expect(view.props.style[0].height).toBe(20);
    expect(view.props.style[0].borderRadius).toBe(4); // Default
  });

  it('renders correctly with custom borderRadius', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Skeleton width={100} height={20} borderRadius={10} />);
    });

    const view = component.root.findByType(Animated.View);
    expect(view.props.style[0].borderRadius).toBe(10);
  });
});
