import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { eventObject, formValues, validationSchema } from './testUtils';
import { useForm } from '../src/form/useForm';
import { DEBOUNCE_WARNING } from '../src/constants';
import { OnChangeEvent } from '../src/types';

describe('useForm', () => {
  afterEach(cleanup);

  it('should return a correct useForm object', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: formValues,
        validationSchema,
      })
    );

    expect(result.current).toEqual({
      values: formValues,
      errors: {
        firstName: undefined,
        lastName: undefined,
      },
      isValid: true,
      onChange: expect.any(Function),
      onSubmit: expect.any(Function),
      reset: expect.any(Function),
      setValues: expect.any(Function),
      setValue: expect.any(Function),
    });
  });

  it('should throw a dev warning if passed debounce arg but no validationSchema', () => {
    const spyWarn = jest.spyOn(console, 'warn');
    renderHook(() =>
      useForm({
        initialValues: formValues,
        debounce: 500,
      })
    );

    expect(spyWarn).toHaveBeenCalledWith(DEBOUNCE_WARNING);
  });

  it('should return isValid true if no validationSchema is provided', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: formValues,
      })
    );

    expect(result.current.isValid).toBe(true);
  });

  it('should update form values via setValues', async () => {
    const updatedFormValues = { firstName: 'bar', lastName: 'foo' };
    const { result } = renderHook(() =>
      useForm({
        initialValues: formValues,
      })
    );

    act(() => {
      result.current.setValues(updatedFormValues);
    });

    expect(result.current.values).toEqual(updatedFormValues);
    expect(result.current.isValid).toBe(true);
    expect(result.current.errors).toStrictEqual({});
  });

  it('should update and validate form values via setValues', async () => {
    const updatedFormValues = { firstName: 'bar', lastName: undefined };
    const { result, waitForNextUpdate } = renderHook(() =>
      useForm({
        initialValues: formValues,
        validationSchema,
      })
    );

    act(() => {
      result.current.setValues(updatedFormValues);
    });

    expect(result.current.values).toEqual(updatedFormValues);

    await waitForNextUpdate();

    expect(result.current.isValid).toBe(false);
    expect(result.current.errors.lastName).toEqual(
      'lastName is a required field'
    );
  });

  it('should update a single form value via setValue', () => {
    const name = 'firstName';
    const value = 'dave';
    const { result } = renderHook(() =>
      useForm({
        initialValues: formValues,
      })
    );

    act(() => {
      result.current.setValue(name, value);
    });

    expect(result.current.values).toEqual({
      ...formValues,
      firstName: value,
    });
    expect(result.current.isValid).toBe(true);
    expect(result.current.errors).toStrictEqual({});
  });

  it('should update and validate a single form value via setValue', async () => {
    const name = 'lastName';
    const value = undefined;
    const { result, waitForNextUpdate } = renderHook(() =>
      useForm({
        initialValues: formValues,
        validationSchema,
      })
    );

    act(() => {
      result.current.setValue(name, value);
    });

    expect(result.current.values).toEqual({
      ...formValues,
      lastName: undefined,
    });

    await waitForNextUpdate();

    expect(result.current.isValid).toBe(false);
    expect(result.current.errors.lastName).toEqual(
      'lastName is a required field'
    );
  });

  it('should reset the form', async () => {
    const initialValues = {
      firstName: '',
      lastName: '',
    };
    const updatedFormValues = {
      firstName: 'bar',
      lastName: 'foo',
    };
    const { result } = renderHook(() =>
      useForm({
        initialValues,
        validationSchema,
      })
    );

    act(() => {
      result.current.setValues(updatedFormValues);
    });

    expect(result.current.values).toEqual(updatedFormValues);
    expect(result.current.errors).toEqual({
      firstName: undefined,
      lastName: undefined,
    });
    expect(result.current.isValid).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({
      firstName: undefined,
      lastName: undefined,
    });
    expect(result.current.isValid).toBe(false);
  });

  it('should update a form value via onChange handler', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: formValues,
      })
    );

    const changeEvt = {
      ...eventObject,
      target: {
        ...eventObject.target,
        name: 'firstName',
      },
    };

    act(() => {
      result.current.onChange(changeEvt as OnChangeEvent);
    });

    expect(result.current.values).toEqual({
      ...formValues,
      firstName: eventObject.target.value,
    });
    expect(result.current.errors).toEqual({
      firstName: undefined,
      lastName: undefined,
    });
    expect(result.current.isValid).toBe(true);
  });

  it('should update a form value via onChange handler with custom name and value', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: formValues,
      })
    );

    const customChangeEvt = {
      name: 'firstName',
      value: 'bob',
    };

    act(() => {
      result.current.onChange(customChangeEvt);
    });

    expect(result.current.values).toEqual({
      ...formValues,
      firstName: customChangeEvt.value,
    });
    expect(result.current.errors).toEqual({
      firstName: undefined,
      lastName: undefined,
    });
    expect(result.current.isValid).toBe(true);
  });

  it('should update and validate a form value via onChange handler', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useForm({
        initialValues: formValues,
        validationSchema,
      })
    );

    const changeEvt = {
      target: {
        ...eventObject.target,
        name: 'lastName',
        value: undefined,
      },
    };

    act(() => {
      result.current.onChange(changeEvt as OnChangeEvent);
    });

    expect(result.current.values).toEqual({
      ...formValues,
      lastName: changeEvt.target.value,
    });

    await waitForNextUpdate();

    expect(result.current.errors).toEqual({
      firstName: undefined,
      lastName: 'lastName is a required field',
    });
    expect(result.current.isValid).toBe(false);
  });

  it('should call preventDefault on event object when submit handler is called', () => {
    const formEvent = {
      preventDefault: jest.fn(),
    };
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useForm({
        initialValues: formValues,
        debounce: 500,
      })
    );

    act(() => {
      result.current.onSubmit(callback)(formEvent as any);
    });

    expect(formEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
