import React from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const BibliothekButton = () => {
  const history = useHistory();

  const handleGuestAccess = () => {
    // Redirect to the library page without signing in
    history.push('/all-books');
  };

  return (
    <Button
      onClick={handleGuestAccess}
      fullWidth
      variant="outlined"
      color="secondary"
      style={{ marginTop: '12px' }}
    >
      See our collection
    </Button>
  );
};

export default BibliothekButton;
