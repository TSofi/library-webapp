import React, { MouseEvent } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDeleteConfirmDialog;
