import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';

const AddBook: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState<number | ''>('');
  const [availableCopies, setAvailableCopies] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookData = {
      isbn,
      title,
      author,
      publisher,
      publicationYear,
      availableCopies,
    };

    try {
      const response = await axios.post('/api/books', bookData);
      console.log('Book added:', response.data);
    } catch (error) {
      console.error('There was an error adding the book!', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(src/assets/images/AdminWallp.jpg)',
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
          Add a New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ISBN"
            variant="outlined"
            fullWidth
            margin="normal"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <TextField
            label="Publisher"
            variant="outlined"
            fullWidth
            margin="normal"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
          <TextField
            label="Publication Year"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(Number(e.target.value))}
            required
          />
          <TextField
            label="Available Copies"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={availableCopies}
            onChange={(e) => setAvailableCopies(Number(e.target.value))}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Book
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddBook;
