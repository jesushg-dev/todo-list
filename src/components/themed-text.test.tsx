import renderer from 'react-test-renderer';
import { ThemedText } from './themed-text';

describe('ThemedText', () => {
  it('renders all types correctly', () => {
    const types: any[] = ['default', 'title', 'small', 'smallBold', 'subtitle', 'link', 'linkPrimary', 'code'];
    for (const type of types) {
      let component: any;
      renderer.act(() => {
        component = renderer.create(<ThemedText type={type} />);
      });
      expect(component.toJSON()).toBeTruthy();
    }
  });
});
