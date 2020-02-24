import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { ObjectSchema } from 'yup';

export type FormValue = {
  [key: string]: any;
};

export interface NameAndValue {
  name: string;
  value: any;
}

export type InputChangeEvent = ChangeEvent<any>;

export type OnChangeEvent = InputChangeEvent | NameAndValue;

export type HandleValidateField<TValues extends FormValue> = (
  name: string,
  value: any,
  validationSchema?: ObjectSchema<TValues>
) => void;

export type SetValues<TValues extends FormValue> = Dispatch<
  SetStateAction<TValues>
>;

export type SetFormValues<TValues extends FormValue> = (
  formValues: Partial<TValues>,
  shouldValidate?: boolean
) => void;

export type SetFormValue<TValues extends FormValue> = (
  name: keyof TValues,
  value: any,
  shouldValidate?: boolean
) => void;

export interface DebounceValidationObj {
  in: number;
  out: number;
}

export type DebounceValidation = number | DebounceValidationObj;

interface Cancelable {
  cancel(): void;
  flush(): void;
}

export type DebounceFn = (
  name: string,
  errorMessage: string | undefined,
  setErrors: Dispatch<SetStateAction<any>>
) => void | Cancelable;

export type DebounceState<TValue> = {
  [key in keyof DebounceValidationObj]: {
    [key in keyof TValue]: any;
  };
};
