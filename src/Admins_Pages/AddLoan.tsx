import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { CreateLoanDto, CreateLoanResponseDto } from '../DTO-s/loanDTO';
import { LibraryClient } from '../backend/libraryClient';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import Footer from '../menu-app-bar/Footer';

const LoanPage: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [bookId, setBookId] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [response, setResponse] = useState<CreateLoanResponseDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const libraryClient = new LibraryClient();

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);

    const loanData: CreateLoanDto = {
      userId: Number(userId),
      bookId: Number(bookId),
      dueDate,
    };

    const result = await libraryClient.takeLoan(loanData);
    if (result.success) {
      setResponse(result.data);
    } else {
      setError('Failed to create loan.');
    }
  };

  return (
    <div>
      <MenuAppBar />
      <div style={{ marginTop: '80px', padding: '20px' }}>
        <Typography variant="h4" component="h2">
          Create a Loan
        </Typography>
        <Card
          variant="outlined"
          sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}
        >
          <CardContent>
            <TextField
              label="User ID"
              type="number"
              fullWidth
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Book ID"
              type="number"
              fullWidth
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: '20px' }}
            >
              Create Loan
            </Button>
            {response && (
              <Typography
                variant="body1"
                color="success.main"
                sx={{ marginTop: '20px' }}
              >
                Loan created successfully!
                {response.dueDate}
              </Typography>
            )}
            {error && (
              <Typography
                variant="body1"
                color="error.main"
                sx={{ marginTop: '20px' }}
              >
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default LoanPage;
