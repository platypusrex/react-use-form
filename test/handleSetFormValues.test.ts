import { handleSetFormValues } from '../src/utils';
import { formValues } from './testUtils';

const setValues = jest.fn() as any;
const validateField = jest.fn() as any;

describe('handleSetFormValues', () => {
  afterEach(() => jest.clearAllMocks());

  it('it should call setValues and validateField', () => {
    handleSetFormValues({
      values: formValues,
      setValues,
      validateField,
      shouldValidate: true,
    });

    expect(setValues).toHaveBeenCalledTimes(1);
    expect(validateField).toHaveBeenCalledTimes(Object.keys(formValues).length);
  });

  it('it should only call setValues if shouldValidate is false', () => {
    handleSetFormValues({
      values: formValues,
      setValues,
      validateField,
      shouldValidate: false,
    });

    expect(setValues).toHaveBeenCalledTimes(1);
    expect(validateField).not.toHaveBeenCalled();
  });
});
