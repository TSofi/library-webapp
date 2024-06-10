import React from 'react';
import { Box, Typography } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import Footer from '../menu-app-bar/Footer';
import backgroundImage from '../assets/images/Library_image.jpg';

const HelpPage = () => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <MenuAppBar />
      <Box
        className="imageBox"
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '1em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh',
          marginX: 'calc(-50vw + 50%)',
          marginY: '1em',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Box
          className="container"
          sx={{
            position: 'relative',
            backgroundColor: 'rgba(254, 251, 251, 0.70)', // Slightly more opaque
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 20px 20px 0px rgba(0, 0, 0, 0.919)',
            borderRadius: '10px',
            width: '43%',
            maxWidth: '800px',
          }}
        >
          <Typography
            component="div"
            sx={{
              width: '100%',
              fontSize: '2.5em',
              fontWeight: 'bold',
              fontFamily: 'Arial, Helvetica, sans-serif',
              marginY: '0',
              lineHeight: '0.9',
              textAlign: 'center',
              textShadow:
                '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black',
            }}
          >
            What help do you need here?
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '1.2em',
              fontFamily: 'Arial, Helvetica, sans-serif',
              marginTop: '0.6em',
              textAlign: 'justify',
              padding: '1em',
            }}
          >
            So, you've stumbled upon our humble abode, the Fantasy Book Club. If
            you find yourself in need of any assistance, just reach out to our
            friendly team at:
            <br />
            <a
              href="secretFantasyLibrary@gmail.com"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              secretFantasyLibrary@gmail.com
            </a>
            <br />
            <br />
            Whether it's about dragons, spells, or just a really good book
            recommendation, we're here to help you navigate the magical world of
            literature!
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HelpPage;
