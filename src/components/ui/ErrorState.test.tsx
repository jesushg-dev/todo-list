import renderer from 'react-test-renderer';
import { ThemedText } from '../themed-text';
import Button from './Button';
import ErrorState from './ErrorState';

describe('ErrorState Component', () => {
  it('renders default title and message', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<ErrorState />);
    });

    const texts = component.root.findAllByType(ThemedText);
    expect(texts[0].props.children).toBe('Oops!');
    expect(texts[1].props.children).toBe('An unexpected error occurred.');
  });

  it('renders custom title and message', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(<ErrorState title="Custom" message="Custom Error" />);
    });

    const texts = component.root.findAllByType(ThemedText);
    expect(texts[0].props.children).toBe('Custom');
    expect(texts[1].props.children).toBe('Custom Error');
  });

  it('renders retry button and calls onRetry', () => {
    const onRetryMock = jest.fn();
    let component: any;
    renderer.act(() => {
      component = renderer.create(<ErrorState onRetry={onRetryMock} />);
    });

    const button = component.root.findByType(Button);
    expect(button).toBeTruthy();

    renderer.act(() => {
      button.props.onPress();
    });
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});
