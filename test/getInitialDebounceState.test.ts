import { getInitialDebounceState } from '../src/utils';
import { debounceTiming, validationSchema } from './testUtils';

describe('getInitialDebounceState', () => {
  it('should return undefined if validationSchema is undefined', () => {
    const debounceState = getInitialDebounceState(debounceTiming);
    expect(debounceState).toStrictEqual(undefined);
  });

  it('should return correct debounce state shape if validationSchema is provided', () => {
    const debounceState = getInitialDebounceState(
      debounceTiming,
      validationSchema
    );
    expect(debounceState).toEqual({
      in: {
        firstName: expect.any(Function),
        lastName: expect.any(Function),
      },
      out: {
        firstName: expect.any(Function),
        lastName: expect.any(Function),
      },
    });
  });
});
