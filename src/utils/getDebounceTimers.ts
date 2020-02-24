import { DebounceValidation, DebounceValidationObj } from '../types';

export const getDebounceTimers = (
  debounceValidation?: DebounceValidation
): DebounceValidationObj => {
  if (!debounceValidation) {
    return {
      in: 0,
      out: 0,
    };
  } else if (typeof debounceValidation === 'number') {
    return {
      in: debounceValidation,
      out: debounceValidation,
    };
  } else {
    return debounceValidation;
  }
};
