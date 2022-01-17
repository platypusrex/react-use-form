import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DebounceState,
  DebounceValidationObj,
  FormError,
  FormValue,
  Validation,
} from '../types';
import {
  getDebounceTimers,
  getInitialValidationState,
  getInitialDebounceState,
  validateField,
} from '../utils';

export interface UseValidation<TValues extends FormValue> {
  errors: FormError<TValues>;
  handleFieldValidation: (name: string, value: any) => void;
  resetErrors: () => void;
}

export const useValidation = <TValues extends FormValue>(
  validation?: Validation<TValues>
): UseValidation<TValues> => {
  const { schema: validationSchema, debounce } = validation ?? {};
  const schemaRef = useRef(validationSchema);
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

  const [errors, setErrors] = useState<FormError<TValues>>(
    initialValidationState
  );

  const debouncers = useRef<DebounceState<TValues> | undefined>(
    initialDebounceState
  );

  useEffect(() => {
    // diff validationSchema against schema stored in ref
    // if the schema has changed since initial render, reset debouncers and update validationSchema
    const fields = validationSchema ? Object.keys(validationSchema.fields) : [];
    const fieldsRef = schemaRef.current
      ? Object.keys(schemaRef.current.fields)
      : [];
    if (!fields.every((val, i) => val === fieldsRef[i])) {
      debouncers.current = getInitialDebounceState(
        debounceTimers.current,
        validationSchema
      );
      schemaRef.current = validationSchema;
    }
  }, [validationSchema]);

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
          debouncers: debouncers.current,
        });
      }
    },
    [errors, initialValidationState, validationSchema]
  );

  return { errors, resetErrors, handleFieldValidation };
};
