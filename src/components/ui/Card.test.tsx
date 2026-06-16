import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Card from './Card';

describe('Card Component', () => {
  it('renders correctly with children', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(
        <Card>
          <Text>Child Content</Text>
        </Card>
      );
    });

    expect(component.toJSON()).toBeTruthy();
    const text = component.root.findByType(Text);
    expect(text.props.children).toBe('Child Content');
  });
});
