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
    <div className="about-background">
      <div className="about-container">
        <h1>About Our Library</h1>
        <p>
          Welcome to the Enchanted Readers Society! Our society is dedicated to
          those who revel in the magic of fantasy literature. To become a
          member, please follow next steps:
        </p>
        <ul>
          <li>
            First Requirement: You should be familiar with the grand masters of
            fantasy, including Sarah J. Maas, Jennifer L. Armentrout, and
            Karissa Brodbent. Know their most celebrated book-series, such as
            "Throne of Glass", "A Court of Thorns and Roses", "Blood and Ash"
            and "Crowns of Nyaxia".
          </li>
          <li>
            Second Requirement: Craft a spellbinding cover letter and send it to
            secretFantasyLibrary@gmail.com. Your letter should include:
            <ul>
              <li>A brief introduction about yourself.</li>
              <li>
                Your favorite fantasy book-series and why it captivates you.
              </li>

              <li>A fantasy world you would love to live in and why.</li>
            </ul>
          </li>
          <li>
            Third Requirement: Cast a patience spell and wait for our mystical
            response. We shall contact you within 7 days to inform you of our
            decision.
          </li>
        </ul>
        <p>May the magic of books guide your journey!</p>

        <Button
          className="back-to-login-button"
          variant="contained"
          onClick={handleBack}
          sx={mainButtonStyle}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default About;
