import { useCallback, useRef, useState } from 'react';
import { ObjectSchema } from 'yup';
import {
  DebounceState,
  DebounceValidation,
  DebounceValidationObj,
  FormValue,
} from '../types';
import {
  getDebounceTimers,
  getInitialValidationState,
  getInitialDebounceState,
  validateField,
} from '../utils';

export interface UseValidation<TValues> {
  errors: Partial<TValues>;
  handleFieldValidation: (name: string, value: any) => void;
  resetErrors: () => void;
}

export const useValidation = <TValues extends FormValue>(
  validationSchema?: ObjectSchema<TValues>,
  debounce?: DebounceValidation
): UseValidation<TValues> => {
  const debounceTimers = useRef<DebounceValidationObj>(
    getDebounceTimers(debounce)
  );
  const initialValidationState = getInitialValidationState<TValues>(
    validationSchema
  );
  const initialDebounceState = getInitialDebounceState<TValues>(
    debounceTimers.current,
    validationSchema
  );

  const [errors, setErrors] = useState<Partial<TValues>>(
    initialValidationState
  );
  const debouncersRef = useRef<DebounceState<TValues> | undefined>(
    initialDebounceState
  );

  const resetErrors = useCallback(() => {
    setErrors(getInitialValidationState(validationSchema));
  }, [validationSchema]);

  const handleFieldValidation = useCallback(
    (name: string, value: any) => {
      if (Reflect.has(initialValidationState, name)) {
        validateField<TValues>({
          validationSchema,
          name,
          value,
          errors,
          setErrors,
          debouncers: debouncersRef.current,
        });
      }
    },
    [errors, initialValidationState, validationSchema]
  );

  return { errors, resetErrors, handleFieldValidation };
};
