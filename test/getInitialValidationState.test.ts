import { getInitialValidationState } from '../src/utils';
import { validationSchema } from './testUtils';

describe('getInitialValidationState', () => {
  it('should return an empty object if no validationSchema is provided', () => {
    const validationState = getInitialValidationState();
    expect(validationState).toStrictEqual({});
  });

  it('should return correct validation state shape if validationSchema is provided', () => {
    const validationState = getInitialValidationState(validationSchema);
    expect(validationState).toEqual({
      firstName: undefined,
      lastName: undefined,
    });
  });
});
