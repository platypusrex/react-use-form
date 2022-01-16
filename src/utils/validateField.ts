import { Dispatch, SetStateAction } from 'react';
import {
  DebounceState,
  FormError,
  FormValue,
  ValidationSchema,
} from '../types';
import { ValidationError } from 'yup';

type ValidateFieldArgs<TValues extends FormValue> = {
  validationSchema?: ValidationSchema<TValues>;
  debouncers?: DebounceState<TValues>;
  name: string;
  value: any;
  errors: FormError<TValues>;
  setErrors: Dispatch<SetStateAction<FormError<TValues>>>;
};

export const validateField = <TValues extends FormValue>({
  validationSchema,
  name,
  value,
  errors,
  setErrors,
  debouncers,
}: ValidateFieldArgs<TValues>): void => {
  if (!validationSchema || !debouncers) {
    return;
  }

  const fieldName = name as keyof TValues;
  const debounceIn = debouncers.in[fieldName];
  const debounceOut = debouncers.out[fieldName];

  validationSchema
    .validateAt(name, {
      [fieldName]: value,
    })
    .then(() => {
      if (errors[fieldName]) {
        debounceOut(name, undefined, setErrors);
      }

      if (debounceIn.cancel) {
        debounceIn.cancel();
      }
    })
    .catch((err: ValidationError) => {
      if (errors[fieldName] !== err.message) {
        debounceIn(name, err.message, setErrors);
      }

      if (debounceOut.cancel) {
        debounceOut.cancel();
      }
    });
};
