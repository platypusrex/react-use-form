import { Dispatch, SetStateAction } from 'react';
import { FormValue, HandleValidateField } from '../types';

interface HandleSetFormValues<TValues extends FormValue> {
  values: Partial<TValues>;
  setValues: Dispatch<SetStateAction<TValues>>;
  validateField: HandleValidateField<TValues>;
  shouldValidate: boolean;
}

export const handleSetFormValues = <TValues extends FormValue>({
  values,
  setValues,
  validateField,
  shouldValidate,
}: HandleSetFormValues<TValues>): void => {
  setValues(prevState => ({
    ...prevState,
    ...values,
  }));

  if (shouldValidate) {
    Object.keys(values).forEach(key => {
      validateField(key, values[key as keyof TValues]);
    });
  }
};
