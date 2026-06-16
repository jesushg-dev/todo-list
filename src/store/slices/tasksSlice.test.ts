import reducer, { addTask, TasksState } from './tasksSlice';

describe('tasksSlice', () => {
  const initialState: TasksState = {
    items: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle adding a task', () => {
    const actual = reducer(initialState, addTask('Test task'));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].description).toEqual('Test task');
    expect(actual.items[0].id).toBeDefined();
  });
});
