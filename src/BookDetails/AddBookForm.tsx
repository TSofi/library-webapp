import React, { useState } from 'react';

const AddBookForm: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = {
      isbn,
      title,
      author,
      publisher,
      publicationYear,
      isAvailable,
    };

    fetch('/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Book added:', data);
        // Clear the form
        setIsbn('');
        setTitle('');
        setAuthor('');
        setPublisher('');
        setPublicationYear(0);
        setIsAvailable(true);
      })
      .catch((error) => console.error('Error adding book:', error));
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="publisher">Publisher:</label>
        <input
          type="text"
          id="publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="publicationYear">Publication Year:</label>
        <input
          type="number"
          id="publicationYear"
          value={publicationYear}
          onChange={(e) => setPublicationYear(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="isAvailable">Available:</label>
        <input
          type="checkbox"
          id="isAvailable"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
