import React from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = 'text' }) => {

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};