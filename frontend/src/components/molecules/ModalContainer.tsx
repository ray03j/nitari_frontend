import React from "react";
import Button from "../atoms/Button";
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
        <div className="close-flex">
          <div className="empty"></div>
          <button onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};