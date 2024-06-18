import React, { useState } from 'react';
import { UserDto } from '../../DTO-s/userDTO';
import UserDeleteConfirmDialog from './DeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, CardActions, Typography } from '@mui/material';

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
    <Card
      variant="outlined"
      sx={{
        marginX: '25%',
        marginTop: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {user.firstName} {user.lastName}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          label="Delete"
        />
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

interface CustomButtonProps {
  onClick: () => void;
  startIcon?: React.ReactNode;
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  startIcon,
  label,
}) => (
  <button
    className="custom-button"
    onClick={onClick}
    style={{
      backgroundColor: '#f44336',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
    }}
  >
    {startIcon}
    {label}
  </button>
);

export default UserItem;
