import { debounceValidationFn } from '../src/utils';

describe('debounceValidationFn', () => {
  it('should return a debounce function', () => {
    const debounceFn = debounceValidationFn(1000) as any;
    expect(debounceFn).toBeInstanceOf(Function);
    expect(debounceFn.cancel).toBeDefined();
    expect(debounceFn.flush).toBeDefined();
  });

  it('should return a function if timing is falsy', () => {
    const debounceFn = debounceValidationFn(0) as any;
    expect(debounceFn).toBeInstanceOf(Function);
    expect(debounceFn.cancel).not.toBeDefined();
    expect(debounceFn.flush).not.toBeDefined();
  });
});
