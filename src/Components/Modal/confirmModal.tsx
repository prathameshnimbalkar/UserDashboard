import React from 'react';
import './Modal.css'
interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Unsaved Changes</h3>
        <p>{message}</p>
        <button className="button-Yes"onClick={onConfirm}>Yes</button>
        <button className="button-No" onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
