import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Redux hooks', () => {
  it('useAppDispatch calls useDispatch', () => {
    (useDispatch as unknown as jest.Mock).mockReturnValue('mockDispatch');
    expect(useAppDispatch()).toBe('mockDispatch');
  });

  it('useAppSelector is correctly mapped', () => {
    expect(useAppSelector).toBe(useSelector);
  });
});
