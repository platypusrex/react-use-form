import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { object, string } from 'yup';
import { TextField } from './components/TextField/TextField';
import { Button } from './components/Button/Button';
import { useForm } from '../.';
import './index.css';

interface User {
  username: string;
  email: string;
  password?: string;
}

const validationSchema = (user: User | null) =>
  object({
    username: string()
      .required()
      .min(4),
    email: string()
      .required()
      .email(),
    ...(user?.password && {
      password: string()
        .required('Password is required')
        .min(10),
    }),
  });

const getUserAsync = (): Promise<User> => {
  return new Promise(res => {
    setTimeout(() => {
      res({
        username: 'The dude',
        email: 'thedude@email.com',
      });
    }, 1200);
  });
};

const useFetchUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setLoading(true);
    getUserAsync().then(user => {
      setUser(user);
      setLoading(false);
    });
  });

  return { user, loading };
};

export const AsyncForm: React.FC = () => {
  const userMounted = useRef(false);
  const [addPassword, setAddPassword] = useState(false);
  const { user } = useFetchUser();

  const {
    values,
    errors,
    isValid,
    setValues,
    reset,
    onChange,
    onSubmit,
  } = useForm<User>({
    initialValues: { username: '', email: '', password: '' },
    validationSchema: validationSchema(
      addPassword ? { ...user, password: '1234567890' } as User : user
    ),
    debounce: {
      in: 1000,
      out: 0,
    },
  });

  useEffect(() => {
    if (user && !userMounted.current) {
      setValues(addPassword ? { ...user, password: '1234567890' } : user);
      userMounted.current = true;
    }
  }, [user]);

  const handleSubmit = formValues => {
    console.log('formValues', formValues);
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
        <button onClick={() => setAddPassword(currentValue => !currentValue)}>
          {addPassword ? 'remove' : 'add'} password
        </button>
      </div>
    </>
  );
};
