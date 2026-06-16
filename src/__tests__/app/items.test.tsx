import ErrorState from '@/components/ui/ErrorState';
import { FlatList } from 'react-native';
import renderer from 'react-test-renderer';
import { useGetElementsQuery } from '../../services/api';
import { renderWithProviders } from '../../utils/test-utils';
import ItemsScreen from '../../app/items';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children
}));
jest.mock('../../services/api', () => {
  const actual = jest.requireActual('../../services/api');
  return {
    ...actual,
    useGetElementsQuery: jest.fn()
  };
});

describe('ItemsScreen', () => {
  it('renders loading state', () => {
    (useGetElementsQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { ui } = renderWithProviders(<ItemsScreen />);
    let component: any;
    renderer.act(() => {
      component = renderer.create(ui);
    });
    expect(component.toJSON()).toBeTruthy();
    renderer.act(() => {
      component.unmount();
    });
  });

  it('renders error state and handles refetch', () => {
    const refetchMock = jest.fn();
    (useGetElementsQuery as jest.Mock).mockReturnValue({ isError: true, refetch: refetchMock });
    const { ui } = renderWithProviders(<ItemsScreen />);
    let component: any;
    renderer.act(() => {
      component = renderer.create(ui);
    });

    const errorState = component.root.findByType(ErrorState);
    renderer.act(() => {
      errorState.props.onRetry();
    });
    expect(refetchMock).toHaveBeenCalled();
    renderer.act(() => {
      component.unmount();
    });
  });

  it('renders list with data', () => {
    const mockData = [{ id: '1', name: 'Item 1', avatar: 'https://example.com/avatar.jpg' }];
    (useGetElementsQuery as jest.Mock).mockReturnValue({ data: mockData });
    const { ui } = renderWithProviders(<ItemsScreen />);
    let component: any;
    renderer.act(() => {
      component = renderer.create(ui);
    });

    const list = component.root.findByType(FlatList);
    expect(list.props.data).toEqual(mockData);

    // Test renderItem
    const RenderItem = list.props.renderItem as any;
    let renderItemResult: any;
    renderer.act(() => {
      renderItemResult = renderer.create(<RenderItem item={mockData[0]} />);
    });
    expect(renderItemResult.toJSON()).toBeTruthy();

    // Test keyExtractor
    const keyExt = list.props.keyExtractor as any;
    expect(keyExt(mockData[0])).toBe('1');
    renderer.act(() => {
      component.unmount();
    });
  });
});
