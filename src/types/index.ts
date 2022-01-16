import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { ObjectSchema } from 'yup';

export type FormValue = {
  [key: string]: any;
};

export type FormError<TValues> = { [Key in keyof TValues]: string | undefined };

export interface NameAndValue {
  name: string;
  value: any;
}

export type InputChangeEvent = ChangeEvent<any>;

export type OnChangeEvent = InputChangeEvent | NameAndValue;

export type HandleValidateField<TValues extends FormValue> = (
  name: string,
  value: any,
  validationSchema?: ValidationSchema<TValues>
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
  value: TValues[keyof TValues],
  shouldValidate?: boolean
) => void;

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

export interface DebounceValidationObj {
  in: number;
  out: number;
}

export type DebounceValidation = number | DebounceValidationObj;

export type ValidationSchema<TSchema> = ObjectSchema<TSchema>;

export interface Validation<TValues extends FormValue> {
  schema: ValidationSchema<TValues>;
  debounce?: DebounceValidation;
}
