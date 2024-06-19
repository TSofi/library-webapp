import React, { useEffect, useState } from 'react';
import { UserDto } from '../DTO-s/userDTO';
import { useApi } from '../backend/ApiProvider';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import Footer from '../menu-app-bar/Footer';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';

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
      <h1>Users</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          padding: '20px',
        }}
      >
        {users.map((user) => (
          <Paper
            key={user.id}
            style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          >
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteUser(user.id)}
            >
              Delete User
            </Button>
          </Paper>
        ))}
      </div>
      <div style={{ height: '80px' }}></div>
      <Footer />
    </div>
  );
}

export default Users;
