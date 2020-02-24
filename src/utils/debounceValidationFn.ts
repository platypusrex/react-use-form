import debounce from 'lodash.debounce';
import { handleValidationStateUpdate } from './handleValidationStateUpdate';
import { DebounceFn } from '../types';

export const debounceValidationFn = (timing: number): DebounceFn =>
  timing
    ? debounce<DebounceFn>((name, errorMessage, setErrors) => {
        handleValidationStateUpdate(name, errorMessage, setErrors);
      }, timing)
    : (name, errorMessage, setErrors) =>
        handleValidationStateUpdate(name, errorMessage, setErrors);
