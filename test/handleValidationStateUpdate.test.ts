import { handleValidationStateUpdate } from '../src/utils';

const updateState = jest.fn();

describe('handleValidationStateUpdate', () => {
  it('should call state update function', () => {
    handleValidationStateUpdate('name', 'value', updateState);
    expect(updateState).toHaveBeenCalledTimes(1);
  });
});
