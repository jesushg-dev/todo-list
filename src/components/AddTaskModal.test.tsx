import { ThemedText } from '@/components/themed-text';
import Button from '@/components/ui/Button';
import { TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import AddTaskModal from './AddTaskModal';

// Mocking useColorScheme to prevent NativeModule errors from react-native
describe('AddTaskModal Component', () => {
  it('renders correctly when visible', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(
        <AddTaskModal visible={true} onClose={() => { }} onAdd={() => { }} />
      );
    });

    expect(component.root.findByType(TextInput)).toBeTruthy();
    renderer.act(() => {
      component.unmount();
    });
  });

  it('calls onClose when cancel button is pressed', () => {
    const onCloseMock = jest.fn();
    let component: any;
    renderer.act(() => {
      component = renderer.create(
        <AddTaskModal visible={true} onClose={onCloseMock} onAdd={() => { }} />
      );
    });

    const buttons = component.root.findAllByType(Button);
    renderer.act(() => {
      buttons[0].props.onPress();
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
    renderer.act(() => {
      component.unmount();
    });
  });

  it('updates text input', () => {
    let component: any;
    renderer.act(() => {
      component = renderer.create(
        <AddTaskModal visible={true} onClose={() => { }} onAdd={() => { }} />
      );
    });

    const input = component.root.findByType(TextInput);
    renderer.act(() => {
      input.props.onChangeText('New Task');
    });

    expect(input.props.value).toBe('New Task');
    renderer.act(() => {
      component.unmount();
    });
  });

  it('calls onAdd when add button is pressed with valid text', () => {
    const onAddMock = jest.fn();
    const onCloseMock = jest.fn();
    let component: any;
    renderer.act(() => {
      component = renderer.create(
        <AddTaskModal visible={true} onClose={onCloseMock} onAdd={onAddMock} />
      );
    });

    const input = component.root.findByType(TextInput);
    renderer.act(() => {
      input.props.onChangeText('Buy groceries');
    });

    const buttons = component.root.findAllByType(Button);
    renderer.act(() => {
      buttons[1].props.onPress();
    });

    expect(onAddMock).toHaveBeenCalledWith('Buy groceries');
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    renderer.act(() => {
      component.unmount();
    });
  });

  it('shows error if text is empty and hides it when typing', () => {
    const onAddMock = jest.fn();
    let component: any;
    renderer.act(() => {
      component = renderer.create(
        <AddTaskModal visible={true} onClose={() => { }} onAdd={onAddMock} />
      );
    });

    const input = component.root.findByType(TextInput);
    renderer.act(() => {
      input.props.onChangeText('   ');
    });

    const buttons = component.root.findAllByType(Button);
    renderer.act(() => {
      buttons[1].props.onPress();
    });

    expect(onAddMock).not.toHaveBeenCalled();

    // Check if error message is rendered
    const texts = component.root.findAllByType(ThemedText);
    const errorText = texts.find((t: any) => t.props.children === 'Task description cannot be empty');
    expect(errorText).toBeTruthy();

    // Type something to hide error
    renderer.act(() => {
      input.props.onChangeText('A');
    });

    const textsAfter = component.root.findAllByType(ThemedText);
    const errorTextAfter = textsAfter.find((t: any) => t.props.children === 'Task description cannot be empty');
    expect(errorTextAfter).toBeFalsy();
    renderer.act(() => {
      component.unmount();
    });
  });
});
