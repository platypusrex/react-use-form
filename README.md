# react-use-form

[![npm Package](https://img.shields.io/npm/v/@platypusrex/react-use-form.svg)](https://www.npmjs.org/package/@platypusrex/react-use-form)
[![License](https://img.shields.io/npm/l/@platypusrex/react-use-form.svg)](https://github.com/platypusrex/react-use-form/blob/master/LICENSE)

[comment]: <> ([![Coverage Status]&#40;https://coveralls.io/repos/github/platypusrex/next-merge-props/badge.svg?branch=chore/coveralls-github-action&#41;]&#40;https://coveralls.io/github/platypusrex/next-merge-props?branch=chore/coveralls-github-action&#41;)

[comment]: <> (![CI]&#40;https://github.com/platypusrex/react-use-form/workflows/CI/badge.svg&#41;)

### Overview
A simple and subtly powerful react hook for managing form state and validation with [Yup](https://github.com/jquense/yup).
The motivation for creating yet another form hook lib was quite simple: personal use case. I needed a simple form hook that 
could easily manage 95% of the simple forms I was typically with day-to-day. Also wanted to avoid hand rolling validation and 
let a far more powerful library do the heavy lifting. I definitely wanted typescript support and solid autocompletion. 
And due to a particular projects requirements I needed to have control over debouncing validation either in or out. Keep reading below for API details.

### Installation

npm
```shell script
npm install --save @platypusrex/react-use-form
```

or yarn
```shell script
yarn add @platypusrex/react-use-form
```

### Usage

Below is a simple usage example that also showcases most of the hooks API. This also provides an example of how
to create a validation schema using Yup and infer a static type for the form from that schema. For more advanced examples
check out the [examples](https://github.com/platypusrex/react-use-form/tree/master/example) directory.

**note**: In order to properly manage input values you must set a `name` attribute on the input. That attribute value 
should be 1:1 with the form value.

```tsx
import React, { FormEvent } from 'react';
import { useForm } from '@platypusrex/react-use-form';
import { object, string, InferType } from 'yup';

const validationSchema = object({
  email: string().required().email(),
  password: string().required('Password is required').min(10),
});

type FormValues = InferType<typeof validationSchema>;

export const UserForm: React.FC = () => {
  const {
    values,
    errors,
    isValid,
    setValues,
    setValue,
    reset,
    onChange,
    onSubmit
  } = useForm<FormValues>({
    validation: {
      schema: validationSchema,
      debounce: { in: 500, out: 0 },
    },
    initialValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setValue('email', 'foo@bar.com')
    setValues({ password: 'password' });
  }, []);

  const handleSubmit = (formValues) => {
    console.log('formValues', formValues);
  };

  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    reset();
  }

  return (
    <form className="form" onSubmit={onSubmit(handleSubmit)} onReset={handleReset}>
      <div>
        <label htmlFor="email">{label}</label>
        <input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
        />
        {error && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">{label}</label>
        <input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
        />
        {error && <p>{errors.password}</p>}
      </div>
      <button type="reset">Reset</button>
      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
};
```

### Options

The hook accepts a configuration object as input. Below is a table that represents the structure of that object.

| **Property** | **Type** | **Required** |
| --- | --- | --- |
| initialValues | object (TValues) | yes |
| validation | { schema: Yup.ObjectSchema<TValues>; debounce?: { in: number; out: number; } } | no (recommended) |

```ts
export interface UseFormConfig<TValues extends FormValue> {
  initialValues: TValues;
  validation?: Validation<TValues>;
}
```

`intialValues`

The only required input for using the form hook. This represents the form initial state and is always required

`validation`

The validation object is an optional object that is used to validate form state. If the validation schema is not provided
you are essentially opting out of validating your form. Handling change and form submission events will still function as normal.

<small>`schema`</small></br>
If the validation object is provided, a `schema` property is required. This must be a Yup schema object.

<small>`debounce`</small></br>
You may optionally provide a `debounce` property as well. If provided this debounce will be applied to the validation of any form state property.
The debounce value(s) should be expressed in milliseconds. If a `number` primitive is provided, the debounce will occur when an error
occurs and also when an error is resolved by the user's input. You can fine tune the debounce behavior by provided an object with `in` and `out`
properties. Debouncing `in` will delay validation  while `out` will debounce the correction.

### Output

The hook returns an object of the below properties to help you manage your form. 
Below is a table that represents the structure of that object.

| **Property** | **Type** |
| --- | --- |
| values | TValues |
| errors | { [Key in keyof TValues]: string | undefined } |
| isValid | boolean |
| onChange | (e: React.ChangeEvent | { name: string; value: any }) => void; |
| onSubmit | (cb: (values: TValues) => void) => (e: React.FormEvent) => void; |
| reset | () => void; |
| setValues | React.Dispatch<React.SetStateAction<TValues>>; |
| setValue | (formValues: Partial<TValues>, shouldValidate?: boolean) => void; |

```ts
export interface UseForm<TValues extends FormValue> {
  values: TValues;
  errors: FormError<TValues>;
  isValid: boolean;
  onChange: (e: OnChangeEvent) => void;
  onSubmit: (cb: (values: TValues) => void) => (e: FormEvent) => void;
  reset: () => void;
  setValues: SetFormValues<TValues>;
  setValue: SetFormValue<TValues>;
}
```

`values`

An object that represents the form values.

`errors`

An object with the same shape as `values` that represents any errors for form value properties.
This property is not needed if no `validationSchema` is provided.

`isValid`

A boolean that represents the validity of your form state. If no `validationSchema` is provided
this will always evaluate to `true`.

`onChange`

A function that should be used to handle form input change events. A `name` attribute is required
and should match the corresponding form state property key. Internally the `onChange` function will
use the `event` objects target to extract both name and value, but a custom object can also be provided
with the following shape: `{ name: string; value: any; }`. This allows a certain amount of flexibility
to handle change event edge cases like below.

```tsx
const formatOnlyNumbers = (value: string): string => {
  const regex = /\D/g;
  return value.replace(regex, '');
};

const zipChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => onChange({
  name: target.name,
  value: formatOnlyNumbers(target.value),
});

<input type="text" name="zip" value={values.zip} onChange={zipChangeHandler} />
```

`onSubmit`

A function to assist with form submission events. It accepts a callback as an argument and the form state is passed
as a parameter to that callback.

`reset`

A function that resets the form to it's initial state.

`setValues`

This function can be used to programmatically set any number of form values. Accepts a partial form state object and also
boolean (`shouldValidate`) to instruct the function on whether an initial validation of the provided values should occur. This function can be very 
useful when setting form values from a side effect.

`setValue`

Same functionality as `setValues` but for a single form value. Accepts `name` and `value` as arguments as well as a
boolean (`shouldValidate`) to instruct the function on whether an initial validation of the provided values should occur.

### Contributors
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## LICENSE
MIT
