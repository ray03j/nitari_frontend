import React from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalContainer = ({ isOpen, onClose, children }: ModalProps) => {
  if (isOpen === false) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};