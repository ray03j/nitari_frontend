import './Button.css'
import React from 'react';

type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="Button">{children}</button>
  );
};

export default Button;
