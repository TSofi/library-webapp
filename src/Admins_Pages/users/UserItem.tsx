import React, { useState } from 'react';
import { UserDto } from '../../DTO-s/userDTO';
import UserDeleteConfirmDialog from './DeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';

interface UserItemProps {
  user: UserDto;
  deleteUser: (id: number) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, deleteUser }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    deleteUser(user.id);
    setOpen(false);
    console.log(`User with ID ${user.id} deleted successfully!`);
  };

  return (
    <Card variant="outlined" sx={{ width: '60%', mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {user.firstName} {user.lastName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
      <UserDeleteConfirmDialog
        open={open}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Card>
  );
};

export default UserItem;
