import React, { useEffect, useState } from 'react';

import { UserDto } from '../../DTO-s/userDTO';
import { useApi } from '../../backend/ApiProvider';
import MenuAppBar from '../../menu-app-bar/MenuAppBar';
import Footer from '../../menu-app-bar/Footer';
import UserItem from './UserItem';

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
      {users.map((user) => (
        <UserItem key={user.id} user={user} deleteUser={deleteUser} />
      ))}
      <div style={{ height: '80px' }}></div>
      <Footer />
    </div>
  );
}

export default Users;
