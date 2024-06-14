import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../backend/ApiProvider';

const Footer = () => {
  const navigate = useNavigate();
  const apiClient = useApi();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await apiClient.getUserRole();
        setUserRole(role);
        console.log('User Role:', role);
        const admin = await apiClient.isAdmin();
        setIsAdmin(admin);
        console.log('isAdmin:', admin);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [apiClient]);

  return (
    <Box sx={{ bgcolor: '#333', color: 'white', p: 2, paddingX: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Owner: Sofi Tretiak</Typography>
          <Typography>Email: secretFantasyLibrary@gmail.com</Typography>
          <Typography>Phone: 799-088-655</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => navigate('/my_books')} color="inherit">
            My Books
          </Button>
          <Button onClick={() => navigate('/about')} color="inherit">
            About Me and My book-club
          </Button>
          {isAdmin && (
            <>
              <Button
                onClick={() => navigate('/admin/addBook')}
                color="inherit"
              >
                Add Book
              </Button>
              <Button
                onClick={() => navigate('/admin/addUser')}
                color="inherit"
              >
                Add User
              </Button>
              <Button onClick={() => navigate('/admin/users')} color="inherit">
                Users
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
