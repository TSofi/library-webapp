import React, { MouseEvent } from 'react';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
}

const UserDeleteConfirmDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  return (
    <div
      className="dialog-wrapper"
      style={{ display: open ? 'block' : 'none' }}
    >
      <div className="dialog-backdrop" />
      <div className="dialog-box">
        <h2 className="dialog-title">{title}</h2>
        <p className="dialog-text">{message}</p>
        <div className="dialog-buttons">
          <button className="dialog-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="dialog-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteConfirmDialog;
