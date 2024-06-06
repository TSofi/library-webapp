import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { mainButtonStyle } from '../menu-app-bar/buttonStyle';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="about-container">
      <h1>About Our Library</h1>
      <p>
        Welcome to our exclusive library club. To become a member, please follow
        these steps:
      </p>
      <ul>
        <li>Fill out the membership application form.</li>
        <li>Provide a valid ID and proof of address.</li>
        <li>Attend an introductory session with one of our librarians.</li>
      </ul>
      <p>
        For more details, contact us at library@example.com or visit us in
        person.
      </p>
      <Button
        className="back-button"
        variant="contained"
        onClick={handleBack}
        sx={mainButtonStyle}
      >
        Back to Login
      </Button>
    </div>
  );
};

export default About;
