import { FormEvent, useCallback, /*useEffect*/ useState } from 'react';
import { ObjectSchema } from 'yup';
import { useValues } from './useValues';
import { useValidation } from './useValidation';
import {
  getInputNameAndValue,
  handleSetFormValues,
  useIsomorphicLayoutEffect,
} from '../utils';
import { DEBOUNCE_WARNING } from '../constants';
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
  const [isValid, setIsValid] = useState(false);
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

  useIsomorphicLayoutEffect(() => {
    let isMounted = false;
    if (!validationSchema) {
      !isMounted && setIsValid(true);
    } else {
      const currentValidState = validationSchema.isValidSync(values);
      currentValidState !== isValid && setIsValid(currentValidState);
    }

    return () => {
      isMounted = true;
    };
  }, [validationSchema, values]);

  const setValues = useCallback(
    (formValues: Partial<TValues>, shouldValidate = !!validationSchema) =>
      handleSetFormValues({
        values: formValues,
        setValues: handleSetValues,
        validateField: handleFieldValidation,
        shouldValidate,
      }),
    []
  );

  const setValue = useCallback(
    (name: keyof TValues, value: any, shouldValidate = !!validationSchema) =>
      handleSetFormValues({
        values: { [name as any]: value },
        setValues: handleSetValues,
        validateField: handleFieldValidation,
        shouldValidate,
      }),
    []
  );

  const reset = useCallback(() => {
    resetValues(initialValues);
    resetErrors();
  }, [initialValues]);

  const onChange = useCallback((e: OnChangeEvent) => {
    const { name, value } = getInputNameAndValue(e);
    handleOnChange(name, value);

    if (validationSchema) {
      handleFieldValidation(name, value);
    }
  }, []);

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
