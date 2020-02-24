import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Yup from 'yup';
import './index.css';
import { UserForm } from './UserForm';
import { AddressForm } from './AddressForm';
import { useState } from 'react';
import { TextField } from './components/TextField/TextField';

const regex = new RegExp('^((P(ost|ostal)?([ \\.]*O(ffice)?)?([ \\.]*Box)?)*$)', 'i');

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(5).matches(/(hi|bye)/),
  email: Yup.string().required().email(),
  password: Yup.string().required('Password is required'),
  address1: Yup
    .string()
    .required()
    .test('no-po-box', 'P.O. box is not allowed', (value) => !regex.test(value)),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
  address1: '',
};

const App = () => {
  const [activeLink, setActiveLink] = useState('user');

  return (
    <div className="container">
      <div className="button-wrapper space-around">
        <a className="link" onClick={() => setActiveLink('user')}>User Form</a>
        <a className="link" onClick={() => setActiveLink('address')}>Address Form</a>
      </div>
      {activeLink === 'user' && <UserForm />}
      {activeLink === 'address' && <AddressForm />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
