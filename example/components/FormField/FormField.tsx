import * as React from 'react';
import './FormField.css';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  children
}) => (
  <div className="form-field">
    <label className="label" htmlFor={id}>{label}</label>
    {children}
    {error && <p className="error">{error}</p>}
  </div>
);
