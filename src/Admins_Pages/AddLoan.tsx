import React, { useState } from 'react';
import axios from 'axios';

const AddLoan: React.FC = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const [bookId, setBookId] = useState<number | undefined>();
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const baseUrl = 'http://localhost:8081';

  const handleAddLoan = async () => {
    if (!userId || !bookId || !dueDate) {
      setError('Please fill in all required fields.');
      return;
    }

    const createLoanDto = {
      userId: userId,
      bookId: bookId,
      dueDate: dueDate,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/loans/add`,
        createLoanDto,
      );
      console.log('New loan created:', response.data);
    } catch (err) {
      setError('Failed to add loan. Please try again.');
      console.error('Error creating loan:', err);
    }
  };

  return (
    <div>
      <h2>Add Loan</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>User ID:</label>
      <input
        type="number"
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <label>Book ID:</label>
      <input
        type="number"
        onChange={(e) => setBookId(Number(e.target.value))}
      />
      <label>Due Date:</label>
      <input type="date" onChange={(e) => setDueDate(e.target.value)} />
      <button onClick={handleAddLoan}>Add Loan</button>
    </div>
  );
};

export default AddLoan;
