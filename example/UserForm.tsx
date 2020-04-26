import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useEffect } from 'react';
import { TextField } from './components/TextField/TextField';
import { Button } from './components/Button/Button';
import * as Yup from 'yup';
import { useForm } from '../.';
import './index.css';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(4),
  email: Yup.string().required().email(),
  password: Yup.string().required('Password is required').min(10),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
  username: '',
  email: '',
  password: '',
};

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
    initialValues,
    validationSchema,
    debounce: {
      in: 1000,
      out: 0,
    },
  });

  useEffect(() => {
    setValues({ username: 'foo', email: 'bar', password: 'password' });
  }, []);

  const handleSubmit = () => {
    console.log('values', values);
  };

  return (
    <>
      <div className="header">
        <h3>User Form</h3>
        <div className="button-wrapper">
          <button onClick={reset}>reset form</button>
        </div>
      </div>
      <form className="form" onSubmit={onSubmit(handleSubmit)}>
        <TextField
          id="username-input"
          label="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors?.username}
          onChange={onChange}
        />
        <TextField
          id="email-input"
          label="Email"
          name="email"
          type="email"
          value={values.email}
          error={errors?.email}
          onChange={onChange}
        />
        <TextField
          id="password-input"
          label="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors?.password}
          onChange={onChange}
        />
        <Button disabled={!isValid}>Submit</Button>
      </form>
      <div className="button-wrapper margin-top space-around">
        <button onClick={() => setValue('username', 'urname')}>set name</button>
        <button onClick={() => setValue('email', 'ur@email.com')}>set email</button>
        <button onClick={() => setValue('password', 'urpassword')}>set password</button>
      </div>
    </>
  );
};
