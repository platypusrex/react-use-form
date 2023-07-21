import './App.css'
import { useState } from 'react';
import { UserForm } from './UserForm';
import { AddressForm } from './AddressForm';
import { AsyncForm } from './AsyncForm';


export const App = () => {
  const [activeLink, setActiveLink] = useState('user');

  return (
    <div className="container">
      <div className="button-wrapper space-around">
        <a className="link" onClick={() => setActiveLink('user')}>User Form</a>
        <a className="link" onClick={() => setActiveLink('address')}>Address Form</a>
        <a className="link" onClick={() => setActiveLink('async')}>Async Form</a>
      </div>
      {activeLink === 'user' && <UserForm />}
      {activeLink === 'address' && <AddressForm />}
      {activeLink === 'async' && <AsyncForm />}
    </div>
  );
};


export default App
