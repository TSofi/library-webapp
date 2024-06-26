import React from 'react';
import { BookProps } from './BookProps';

const Book: React.FC<BookProps> = ({
  id,
  isbn,
  title,
  author,
  publisher,
  publicationYear,
  available,
}) => {
  return (
    <div className="book">
      <h3>{title}</h3>
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>Publisher:</strong> {publisher}
      </p>
      <p>
        <strong>Year:</strong> {publicationYear}
      </p>
      <p>
        <strong>ISBN:</strong> {isbn}
      </p>
      <p>
        <strong>Available:</strong> {available ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

export default Book;
