import { getDebounceTimers } from '../src/utils';

describe('getDebounceTimers', () => {
  it('should return an object with in/out properties and a value of 0 if no args supplied', () => {
    const timers = getDebounceTimers();
    expect(timers).toEqual({
      in: 0,
      out: 0,
    });
  });

  it('should return an object with in/out properties with same value supplied a number', () => {
    const timers = getDebounceTimers(500);
    expect(timers).toEqual({
      in: 500,
      out: 500,
    });
  });

  it('should return the same supplied argument if argument is an object with in/out properties', () => {
    const timers = getDebounceTimers({
      in: 500,
      out: 250,
    });
    expect(timers).toEqual({
      in: 500,
      out: 250,
    });
  });
});
