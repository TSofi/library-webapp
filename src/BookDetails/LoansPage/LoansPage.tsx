import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import './styles.css';

const LoansPage: React.FC = () => {
  const [bookName, setBookName] = useState('');
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Simulate user login and fetch token and user ID
  useEffect(() => {
    const simulateUserLogin = async () => {
      try {
        // Simulate fetching user details and token
        const loginResponse = await axios.post('http://localhost:8081/api/auth/login', {
          username: 'your-username',
          password: 'your-password',
        });

        const { token, user } = loginResponse.data;

        // Store the token and user ID
        setToken(token);
        setUserId(user.id);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    simulateUserLogin();
  }, []);

  const handleLoanBook = async () => {
    if (!selectedBook) {
      setMessage('Please select a book');
      return;
    }

    try {
      if (!userId || !token) {
        throw new Error('User ID or token not available');
      }

      const response = await axios.post('http://localhost:8081/api/loans/add', {
        userId: userId,
        bookId: selectedBook.id,
        loanDate: new Date().toISOString().slice(0, 10), // Today's date as loan date
        dueDate: '2024-06-23', // Replace with actual due date
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Display success message and clear selected book
      setMessage(`Successfully loaned ${selectedBook.title}`);
      setSelectedBook(null);
    } catch (error) {
      console.error('Error loaning book:', error);
      setMessage('Failed to loan the book');
    }
  };

  return (
    <div className="container">
      <h2>Loans Page</h2>
      <div className="loan-form">
        <label htmlFor="bookName">Book Name</label>
        <Autocomplete
          value={bookName}
          onChange={(newValue: string) => setBookName(newValue)}
          onSelect={(book: any) => setSelectedBook(book)}
        />
        <button className="loan-button" onClick={handleLoanBook}>
          Loan Book
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoansPage;
