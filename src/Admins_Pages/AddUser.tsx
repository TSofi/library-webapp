import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';

const AddUser: React.FC = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      password,
      username,
      firstName,
      lastName,
      email,
      role,
    };

    try {
      const response = await axios.post('api/users/add', userData);
      console.log('User added:', response.data);
    } catch (error) {
      console.error('There was an error adding the user!', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'urlurl(src/assets/images/AdminWallp.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MenuAppBar />
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
          mt: 10, // Margin to push content below the AppBar
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add a New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="READER">Reader</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add User
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddUser;
