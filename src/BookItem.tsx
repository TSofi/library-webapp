import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
}

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {book.title}
        </Typography>
        <Typography color="textSecondary">Author: {book.author}</Typography>
        <Typography color="textSecondary">
          Publisher: {book.publisher}
        </Typography>
        <Typography color="textSecondary">ISBN: {book.isbn}</Typography>
        {/* Add more details as needed */}
      </CardContent>
    </Card>
  );
};

export default BookItem;
