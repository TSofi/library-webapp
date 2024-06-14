import React, { useEffect, useState } from 'react';
import { LibraryClient, ClientResponse } from '../backend/libraryClient';
import { GetBookDto } from '../DTO-s/bookDTO';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import Footer from '../menu-app-bar/Footer'; // Assuming the Footer component is in './Footer'
import Autocomplete from './LoansPage/Autocomplete'; // Adjust the path based on your file structure

const BookList: React.FC = () => {
  const [books, setBooks] = useState<GetBookDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [page, searchTerm]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const client = new LibraryClient();
      const response: ClientResponse<GetBookDto[] | null> =
        await client.getBooks(page, searchTerm);

      if (response.success && response.data) {
        setBooks(response.data);
      } else {
        setError('Failed to fetch books.');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setPage(0);
    setSearchTerm(term);
  };

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = `hsl(${hue}, 70%, 80%)`;
    return pastel;
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAutocompleteSelect = (option: any) => {
    handleSearch(option.title);
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
            <Link to="/books">
              <IconButton color="inherit">
                <BookIcon />
              </IconButton>
            </Link>
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
                  navigate('/my_loans');
                }}
              >
                My Loans
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
        <h2>Book List</h2>

        <div style={{ marginBottom: '20px' }}>
          <Autocomplete
            value={searchTerm || ''}
            onChange={(value) => handleSearch(value)}
            onSelect={handleAutocompleteSelect}
          />
        </div>

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                backgroundColor: getRandomPastelColor(),
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                color: 'black',
              }}
            >
              <h3>{book.title}</h3>
              <p style={{ color: 'black' }}>Author: {book.author}</p>
              <p style={{ color: 'black' }}>ISBN: {book.isbn}</p>
              <p style={{ color: 'black' }}>Publisher: {book.publisher}</p>
              <p style={{ color: 'black' }}>
                Publication Year: {book.publicationYear}
              </p>
              <p style={{ color: 'black' }}>
                Available: {book.available ? 'Yes' : 'No'}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <button onClick={() => setPage((prevPage) => prevPage + 1)}>
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookList;
