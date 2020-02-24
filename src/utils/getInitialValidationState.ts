import { ObjectSchema } from 'yup';
import { FormValue } from '../types';

export const getInitialValidationState = <TValues extends FormValue>(
  validationSchema?: ObjectSchema
): Partial<TValues> => {
  const fields = validationSchema?.describe().fields;

  if (!fields) {
    return {};
  }

  return Object.keys(fields).reduce((acc, curr) => {
    const field = curr as keyof TValues;
    acc[field] = undefined;
    return acc;
  }, {} as { [key in keyof TValues]: undefined });
};
