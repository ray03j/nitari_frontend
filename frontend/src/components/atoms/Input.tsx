import React, { ComponentPropsWithRef } from "react";


export const Input = ({ value, onChange, placeholder, type = 'text' }:ComponentPropsWithRef<"input">) => {

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};