import * as React from 'react';
import { ChangeEvent } from 'react';
import { FormField } from '../FormField/FormField';
import './TextField.css';

interface TextFieldProps {
  id: string;
  name: string;
  value?: string | number;
  type: string;
  label: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = React.memo<TextFieldProps>(
    ({
    id,
    name,
    value,
    type,
    label,
    error,
    onChange,
  }) => (
    <FormField id={id} label={label} error={error}>
      <input
        className={`text-input ${error ? 'error' : ''}`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </FormField>
  )
);
