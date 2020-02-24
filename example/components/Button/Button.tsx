import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children
}) => (
  <button className="button" disabled={disabled} onClick={onClick}>
    {children}
  </button>
);
