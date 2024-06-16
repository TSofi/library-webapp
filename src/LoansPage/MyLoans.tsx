import React, { useEffect, useState } from 'react';
import { LoanPageDto, LoanDto } from '../DTO-s/loanDTO';
import { GetBookDto } from '../DTO-s/bookDTO';
import { LibraryClient, ClientResponse } from '../backend/libraryClient';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Footer from '../menu-app-bar/Footer';
import Autocomplete from '../LoansPage/Autocomplete';

const MyLoans: React.FC = () => {
  const [loanPage, setLoanPage] = useState<LoanPageDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, [page, searchTerm]);

  const fetchLoans = async () => {
    setLoading(true);
    setError(null);

    try {
      const client = new LibraryClient();
      const response: ClientResponse<LoanPageDto | null> =
        await client.getLoans(page, 1);

      if (response.success && response.data) {
        setLoanPage(response.data);
      } else {
        setError('Failed to fetch loans.');
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
      setError('Failed to fetch loans.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setPage(0);
    setSearchTerm(term);
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
            <Button color="inherit" onClick={() => navigate('/loans')}>
              Make new Loan
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
        <h2>My Loans</h2>

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
          {loanPage?.loans.map((loan) => (
            <div
              key={loan.id}
              style={{
                backgroundColor: 'lightblue', // Change this to a color or function of your choice
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                color: 'black',
              }}
            >
              <h3>{loan.book.title}</h3>
              <p style={{ color: 'black' }}>Author: {loan.book.author}</p>
              <p style={{ color: 'black' }}>ISBN: {loan.book.isbn}</p>
              <p style={{ color: 'black' }}>Due Date: {loan.dueDate}</p>
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

export default MyLoans;
