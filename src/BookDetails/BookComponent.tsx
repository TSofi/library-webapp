// BookComponent.tsx
import React from 'react';
import { BookProps } from './BookProps';

interface BookComponentProps extends BookProps {
  onRequestLoan: () => void;
}

const BookComponent: React.FC<BookComponentProps> = ({
  id,
  isbn,
  title,
  author,
  publisher,
  publicationYear,
  available,
  onRequestLoan,
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
        <strong>available:</strong> {available ? 'Yes' : 'No'}
      </p>
      {available && (
        <button onClick={onRequestLoan} className="loan-button">
          I want to borrow this book
        </button>
      )}
    </div>
  );
};

export default BookComponent;
