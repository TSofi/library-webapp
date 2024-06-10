// LoanForm.tsx
import React, { useState } from 'react';
import { BookProps } from './BookProps';

interface LoanFormProps {
  book: BookProps;
  onLoanRequested: (bookId: number, duration: number) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ book, onLoanRequested }) => {
  const [duration, setDuration] = useState<number>(1); // Default duration 1 week

  const handleRequestLoan = () => {
    onLoanRequested(book.id, duration);
  };

  return (
    <div className="loan-form">
      <h3>Request Loan</h3>
      <p>
        You are requesting to borrow: <strong>{book.title}</strong>
      </p>
      <label htmlFor="duration">Select Loan Duration:</label>
      <select
        id="duration"
        name="duration"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      >
        <option value={1}>1 week</option>
        <option value={2}>2 weeks</option>
        <option value={3}>3 weeks</option>
        <option value={4}>4 weeks</option>
        <option value={5}>5 weeks</option>
      </select>
      <button onClick={handleRequestLoan}>Request Loan</button>
    </div>
  );
};

export default LoanForm;
