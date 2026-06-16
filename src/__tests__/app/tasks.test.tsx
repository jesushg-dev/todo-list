import Button from '@/components/ui/Button';
import { FlatList } from 'react-native';
import renderer from 'react-test-renderer';
import AddTaskModal from '../../../components/AddTaskModal';
import { renderWithProviders } from '../../../utils/test-utils';
import TasksScreen from '../../../app/tasks';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children
}));

describe('TasksScreen', () => {

  it('renders empty list', () => {
    jest.useFakeTimers();
    const { ui } = renderWithProviders(<TasksScreen />);
    let component: any;
    renderer.act(() => {
      component = renderer.create(ui);
    });
    expect(component.toJSON()).toBeTruthy();

    // Test ListEmptyComponent
    const list = component.root.findByType(FlatList);
    const ListEmptyComponent = list.props.ListEmptyComponent;
    let emptyResult: any;
    renderer.act(() => {
      emptyResult = renderer.create(ListEmptyComponent);
    });
    expect(emptyResult.toJSON()).toBeTruthy();

    renderer.act(() => {
      jest.runAllTimers();
    });
    renderer.act(() => {
      component.unmount();
    });
    jest.useRealTimers();
  });

  it('renders tasks and handles adding tasks', () => {
    jest.useFakeTimers();
    const mockTasks = [{ id: '1', description: 'Test Task' }];
    const { ui, store } = renderWithProviders(<TasksScreen />, {
      preloadedState: {
        tasks: { items: mockTasks }
      }
    });

    let component: any;
    renderer.act(() => {
      component = renderer.create(ui);
    });

    const list = component.root.findByType(FlatList);

    // Test renderItem
    const RenderItem = list.props.renderItem as any;
    let renderItemResult: any;
    renderer.act(() => {
      renderItemResult = renderer.create(<RenderItem item={mockTasks[0]} />);
    });
    expect(renderItemResult.toJSON()).toBeTruthy();

    const keyExt = list.props.keyExtractor as any;
    expect(keyExt(mockTasks[0])).toBe('1');

    // Open Modal
    const button = component.root.findByType(Button);
    renderer.act(() => {
      button.props.onPress();
    });

    const modal = component.root.findByType(AddTaskModal);
    expect(modal.props.visible).toBe(true);

    // Add a task
    renderer.act(() => {
      modal.props.onAdd('New Task');
    });
    const state = store.getState();
    expect(state.tasks.items.length).toBe(2);
    expect(state.tasks.items[1].description).toBe('New Task');

    // Close modal
    renderer.act(() => {
      modal.props.onClose();
    });

    // After onClose, component re-renders
    const modalUpdated = component.root.findByType(AddTaskModal);
    expect(modalUpdated.props.visible).toBe(false);

    renderer.act(() => {
      jest.runAllTimers();
    });
    renderer.act(() => {
      component.unmount();
    });
    jest.useRealTimers();
  });
});
