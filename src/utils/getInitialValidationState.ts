import { FormValue, ValidationSchema } from '../types';

export const getInitialValidationState = <TValues extends FormValue>(
  validationSchema?: ValidationSchema<TValues>
): { [key in keyof TValues]: undefined } => {
  const fields = validationSchema?.describe().fields;

  if (!fields) {
    // @ts-ignore
    return {};
  }

  return Object.keys(fields).reduce((acc, curr) => {
    const field = curr as keyof TValues;
    acc[field] = undefined;
    return acc;
  }, {} as { [key in keyof TValues]: undefined });
};
