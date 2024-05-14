import React from 'react';

const AllBooksPage = () => {
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
  ];

  return (
    <div>
      <h1>All Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div>Title: {book.title}</div>
            <div>Author: {book.author}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBooksPage;

export {};
