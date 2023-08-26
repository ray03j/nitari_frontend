import React, { ComponentPropsWithRef } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";


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