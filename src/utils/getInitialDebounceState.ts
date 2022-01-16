import { debounceValidationFn } from './debounceValidationFn';
import {
  DebounceState,
  DebounceValidationObj,
  FormValue,
  ValidationSchema,
} from '../types';

export const getInitialDebounceState = <TValues extends FormValue>(
  debounceTiming: DebounceValidationObj,
  validationSchema?: ValidationSchema<TValues>
): DebounceState<TValues> | undefined => {
  if (!validationSchema) {
    return;
  }

  return Object.keys(debounceTiming).reduce((acc, curr) => {
    const timing = debounceTiming[curr as keyof typeof debounceTiming];
    acc[curr] = Object.keys(validationSchema.describe().fields).reduce(
      (acc, curr) => {
        acc[curr] = debounceValidationFn(timing);
        return acc;
      },
      {} as any
    );
    return acc;
  }, {} as any);
};
