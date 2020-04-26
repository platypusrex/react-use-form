import * as React from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactElement | string;
}

export const Button = React.memo<ButtonProps>(
    ({
    onClick,
    disabled,
    children
  }) => (
    <button className="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
);
