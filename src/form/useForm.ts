import { FormEvent, useCallback, useMemo } from 'react';
import { ObjectSchema } from 'yup';
import { useValues } from './useValues';
import { useValidation } from './useValidation';
import { DEBOUNCE_WARNING } from '../constants';
import {
  getInputNameAndValue,
  handleSetFormValues,
  useEventCallback,
} from '../utils';
import {
  DebounceValidation,
  FormValue,
  OnChangeEvent,
  SetFormValue,
  SetFormValues,
} from '../types';

export interface UseFormConfig<TValues extends FormValue> {
  initialValues: TValues;
  validationSchema?: ObjectSchema<TValues>;
  debounce?: DebounceValidation;
}

export interface UseForm<TValues extends FormValue> {
  values: TValues;
  errors: Partial<TValues>;
  isValid: boolean;
  onChange: (e: OnChangeEvent) => void;
  onSubmit: (cb: (values: TValues) => void) => (e: FormEvent) => void;
  reset: () => void;
  setValues: SetFormValues<TValues>;
  setValue: SetFormValue<TValues>;
}

export const useForm = <TValues extends FormValue>({
  initialValues,
  validationSchema,
  debounce,
}: UseFormConfig<TValues>): UseForm<TValues> => {
  const {
    values,
    setValues: handleSetValues,
    resetValues,
    handleOnChange,
  } = useValues(initialValues);
  const { errors, resetErrors, handleFieldValidation } = useValidation(
    validationSchema,
    debounce
  );

  if (__DEV__ && debounce && !validationSchema) {
    console.warn(DEBOUNCE_WARNING);
  }

  const isValid = useMemo(
    () => (validationSchema ? validationSchema.isValidSync(values) : true),
    [validationSchema, values]
  );

  const setValues = useCallback(
    (formValues: Partial<TValues>, shouldValidate = !!validationSchema) =>
      handleSetFormValues({
        values: formValues,
        setValues: handleSetValues,
        validateField: handleFieldValidation,
        shouldValidate,
      }),
    [handleFieldValidation, handleSetValues, validationSchema]
  );

  const setValue = useCallback(
    (name: keyof TValues, value: any, shouldValidate = !!validationSchema) =>
      handleSetFormValues({
        values: { [name as any]: value },
        setValues: handleSetValues,
        validateField: handleFieldValidation,
        shouldValidate,
      }),
    [handleFieldValidation, handleSetValues, validationSchema]
  );

  const reset = useCallback(() => {
    resetValues(initialValues);
    resetErrors();
  }, [initialValues, resetErrors, resetValues]);

  const onChange = useEventCallback((e: OnChangeEvent) => {
    const { name, value } = getInputNameAndValue(e);
    handleOnChange(name, value);

    if (validationSchema) {
      handleFieldValidation(name, value);
    }
  });

  const onSubmit = useCallback(
    (cb: (values: TValues) => void) => (e: FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      cb(values);
    },
    [values]
  );

  return {
    values,
    errors,
    isValid,
    onChange,
    onSubmit,
    reset,
    setValues,
    setValue,
  };
};
