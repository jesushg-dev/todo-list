import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button Component', () => {
  it('renders correctly with given title', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Button title="Press Me" onPress={() => { }} />);
    });
    expect(component.toJSON()).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Button title="Press Me" onPress={onPressMock} />);
    });

    const pressable = component.root.find((node: any) => node.props.onPress === onPressMock && node.type !== Button);
    renderer.act(() => {
      pressable.props.onPress({} as any);
    });

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('passes disabled prop correctly', () => {
    const onPressMock = jest.fn();
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Button title="Press Me" onPress={onPressMock} disabled />);
    });

    const pressable = component.root.find((node: any) => node.props.disabled === true && node.type !== Button);
    expect(pressable.props.disabled).toBe(true);
  });

  it('renders outline variant correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Button title="Outline" variant="outline" />);
    });
    expect(component.toJSON()).toBeTruthy();
  });

  it('renders secondary variant correctly', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Button title="Secondary" variant="secondary" />);
    });
    expect(component.toJSON()).toBeTruthy();
  });

  it('applies pressed styles when pressed', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Button title="Press Me" />);
    });

    const pressable = component.root.find((node: any) => typeof node.props.style === 'function' && node.type !== Button);
    const styleObj = pressable.props.style({ pressed: true });
    expect(styleObj).toBeDefined();
  });
});
