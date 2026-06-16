import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { ThemedView } from './themed-view';

describe('ThemedView Component', () => {
  it('renders with default background color', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<ThemedView />);
    });

    const view = component.root.findByType(View);
    expect(view.props.style[0].backgroundColor).toBe('#ffffff');
  });

  it('renders with specific theme color type', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<ThemedView type="backgroundElement" />);
    });

    const view = component.root.findByType(View);
    expect(view.props.style[0].backgroundColor).toBe('#F0F0F3');
  });
});
