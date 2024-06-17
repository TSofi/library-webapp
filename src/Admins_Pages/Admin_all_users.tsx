import React, { useEffect, useState } from 'react';
import { LibraryClient, ClientResponse } from '../backend/libraryClient';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Footer from '../menu-app-bar/Footer';
import { UserDto } from '../DTO-s/userDTO';

const Admin_all_users: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const client = new LibraryClient();
      const response: ClientResponse<UserDto[] | null> =
        await client.getUsers();

      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError('Failed to fetch users.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = `hsl(${hue}, 70%, 80%)`;
    return pastel;
  };

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your Fantasy Library
          </Typography>
          <div>
            <Link to="/home">
              <IconButton color="inherit">
                <HomeIcon />
              </IconButton>
            </Link>
            <Button color="inherit" onClick={() => navigate('/take_loan')}>
              Take Loan
            </Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/profile');
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/help');
                }}
              >
                Help
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate('/login');
                }}
              >
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '80px', padding: '20px' }}>
        <h2>User List</h2>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                backgroundColor: getRandomPastelColor(),
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                color: 'black',
              }}
            >
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p style={{ color: 'black' }}>Username: {user.username}</p>
              <p style={{ color: 'black' }}>Email: {user.email}</p>
              <p style={{ color: 'black' }}>Role: {user.role}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin_all_users;
