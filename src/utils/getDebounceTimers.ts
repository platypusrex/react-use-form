import { DebounceValidation, DebounceValidationObj } from '../types';

export const getDebounceTimers = (
  debounce: DebounceValidation = 0
): DebounceValidationObj => {
  return typeof debounce !== 'number'
    ? debounce
    : { in: debounce, out: debounce };
};
