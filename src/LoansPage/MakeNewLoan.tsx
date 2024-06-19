import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import Footer from '../menu-app-bar/Footer';

const MakeNewLoan: React.FC = () => {
  return (
    <div>
      <MenuAppBar />
      <div style={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Make a New Loan
        </Typography>
        <Card
          variant="outlined"
          sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}
        >
          <CardContent>
            <Typography variant="body1" gutterBottom>
              If you want to make a new loan, please write to this email
              address: <strong>Wanna_take_book@gmail.com</strong>
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: '20px',
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                backgroundImage:
                  'linear-gradient(135deg, rgb(8, 8, 226), rgb(253, 80, 80))',
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 10s ease infinite',
                boxShadow:
                  '0px 3px 15px rgba(0, 0, 0, 0)' /* Initially no shadow */,
                '&:hover': {
                  boxShadow:
                    '0px 3px 15px rgba(0, 0, 0, 0.3)' /* Add shadow on hover */,
                },
              }}
              onClick={() => {
                // Handle action for checking book availability
                alert('Check availability for your future book!');
              }}
              href="/books" // Add href attribute to navigate to /books
            >
              Books
            </Button>
            <Typography variant="body1" gutterBottom>
              For now, check availability for your future book.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default MakeNewLoan;
