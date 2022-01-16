import { useCallback, useState } from 'react';
import { FormValue, SetValues } from '../types';

export interface UseValues<TValues extends FormValue> {
  values: TValues;
  setValues: SetValues<TValues>;
  handleOnChange: (name: string, value: any) => void;
  resetValues: (initialValues: TValues) => void;
}

export const useValues = <TValues extends FormValue>(
  initialValues: TValues
): UseValues<TValues> => {
  const [values, setValues] = useState<TValues>(initialValues);

  const resetValues = useCallback((initialValues: TValues) => {
    setValues(initialValues);
  }, []);

  const handleOnChange = useCallback((name: string, value: any) => {
    setValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return { values, setValues, resetValues, handleOnChange };
};
