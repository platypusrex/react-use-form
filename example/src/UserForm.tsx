import { useEffect } from 'react';
import { useForm } from '@platypusrex/react-use-form';
import { object, string, InferType } from 'yup';
import { TextField } from './components/TextField/TextField';
import { Button } from './components/Button/Button';
import './index.css';

const schema = object({
  username: string().required().min(4),
  email: string().required().email(),
  password: string().required('Password is required').min(10),
});

type FormValues = InferType<typeof schema>;

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
    validation: {
      schema,
      debounce: { in: 1000, out: 0 },
    },
  });

  useEffect(() => {
    setValues({ username: 'foo', email: 'bar', password: 'password' });
  }, []);

  const handleSubmit = (formValues: FormValues) => {
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
        <button onClick={() => setValue('username', 'urname')}>set name</button>
        <button onClick={() => setValue('email', 'ur@email.com')}>set email</button>
        <button onClick={() => setValue('password', 'urpassword')}>set password</button>
      </div>
    </>
  );
};
