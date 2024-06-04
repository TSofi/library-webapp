import React, { useEffect, useState } from 'react';
import Book from './Book';
import { BookProps } from './BookProps';
import './BookList.css';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log('Fetching books...');
    fetch('http://localhost:8081/api/addBook/getAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        console.log('Received response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data);
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Error fetching books. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-list-container">
      <h2>Choose Your Book</h2>
      <div className="book-list">
        {books.map((book) => (
          <div className="book-box" key={book.id}>
            <Book {...book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
