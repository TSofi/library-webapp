import React, { useEffect, useState } from 'react';

import { UserDto } from '../../DTO-s/userDTO';
import { useApi } from '../../backend/ApiProvider';
import MenuAppBar from '../../menu-app-bar/MenuAppBar';
import Footer from '../../menu-app-bar/Footer';
import UserItem from './UserItem';
import { Container, Typography, Box } from '@mui/material';

function Users() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    async function fetchUsers() {
      const response = await apiClient.getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    }

    fetchUsers();
  }, [apiClient]);

  async function deleteUser(id: number) {
    const response = await apiClient.deleteUser(id);
    if (response.success) {
      setUsers(users.filter((user) => user.id !== id));
    }
  }

  return (
    <div>
      <MenuAppBar />
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Users
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            Welcome to the User Management Dashboard.
            <br />
            Here you can view, manage, and delete users in the library system.
            <br />
            Please note that deleting a user is permanent and cannot be undone.
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          {users.map((user) => (
            <UserItem key={user.id} user={user} deleteUser={deleteUser} />
          ))}
        </Box>
        <Footer />
      </Container>
    </div>
  );
}

export default Users;
