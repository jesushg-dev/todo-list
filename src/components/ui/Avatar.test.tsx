import renderer from 'react-test-renderer';
import { ThemedText } from '../themed-text';
import Avatar from './Avatar';

describe('Avatar Component', () => {
  it('renders correct initials for two names', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Avatar name="John Doe" />);
    });
    const text = component.root.findByType(ThemedText);
    expect(text.props.children).toBe('JD');
  });

  it('renders correct initials for a single name', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Avatar name="John" />);
    });
    const text = component.root.findByType(ThemedText);
    expect(text.props.children).toBe('J');
  });

  it('renders correct initials for multiple names (first and last)', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Avatar name="John Jacob Jingleheimer Schmidt" />);
    });
    const text = component.root.findByType(ThemedText);
    expect(text.props.children).toBe('JS');
  });

  it('renders fallback character for empty name', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Avatar name="" />);
    });
    const text = component.root.findByType(ThemedText);
    expect(text.props.children).toBe('?');
  });

  it('renders fallback character for whitespace name', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Avatar name="   " />);
    });
    const text = component.root.findByType(ThemedText);
    expect(text.props.children).toBe('?');
  });

  it('handles image load error', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<Avatar uri="https://example.com/bad.jpg" name="Fallback Name" />);
    });

    // Call onError
    const image = component.root.find((node: any) => node.props.source && node.props.source.uri === 'https://example.com/bad.jpg');
    renderer.act(() => {
      image.props.onError();
    });

    // After error, it should show initials instead of image
    const text = component.root.findByType(ThemedText);
    expect(text.props.children).toBe('FN');
  });
});
