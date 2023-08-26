import './Button.css'
import React, { ComponentPropsWithRef } from 'react';

const Button = ({ children, className, ...props }: ComponentPropsWithRef<"button">) => {
  return (
    <button className="Button" {...props}>{children}</button>
  );
};

export default Button;
