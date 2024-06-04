import { Button, Box, Typography } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import './HomePage.css';
import Footer from '../menu-app-bar/Footer';
import backgroundImage from '../assets/images/cirkle_lib.jpg';

function HomePage() {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8' }}>
      <MenuAppBar />
      <div className="mainBoxContainer">
        <hr className="hr1" />
        <Box
          className="imageBox"
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundSize: 'cover',
            width: '100%',
            alignItems: 'flex-start',
            marginX: 'calc(-50vw + 50%)',
            marginY: '1em',
            height: '100vh',
          }}
        >
          <Typography
            component="div"
            sx={{
              width: '60%',
              fontSize: '2.5em',
              fontWeight: 'bold',
              fontFamily: 'Arial, Helvetica, sans-serif',
              marginY: '0',
              lineHeight: '0.9',
              paddingLeft: '1em',
              textShadow:
                '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black',
            }}
          >
            Do you want to dive into a new world?
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: '1.2em',
              fontFamily: 'Arial, Helvetica, sans-serif',
              marginTop: '0.6em',
              paddingLeft: '1em',
            }}
          >
            Find out your new passion
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundImage:
                'linear-gradient(135deg, #FF1493, #9400D3, #191970)',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '30px',
              width: '8em',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold',
              fontSize: '0.9em',
              marginTop: '1em',
              paddingLeft: '1em',
              transition: 'background-image 0.3s ease-in-out',
              '&:hover': {
                backgroundImage:
                  'linear-gradient(135deg,#94c8ff, #c994ff, #ed90f3)',
              },
            }}
            component={Link}
            to="/books"
          >
            Explore
          </Button>
        </Box>
        <hr className="hr1" />
        <Typography
          sx={{
            fontSize: '1.7em',
            fontWeight: 'bold',
            fontFamily: 'Arial, Helvetica, sans-serif',
            marginY: '0',
            color: '#222',
            marginLeft: '2.5em',
            marginTop: '1em',
          }}
        >
          Rules of memebrship
        </Typography>
        <hr className="hr2" />
        <div className="boxContainer"></div>
        <Typography
          sx={{
            fontSize: '1.7em',
            fontWeight: 'bold',
            fontFamily: 'Arial, Helvetica, sans-serif',
            marginY: '0',
            color: '#222',
            marginLeft: '2.5em',
            marginTop: '1em',
          }}
        >
          Some another text-box maybe i will need this later
        </Typography>
        <hr className="hr2" />
      </div>
      <Footer />
      <Outlet />
    </Box>
  );
}
export default HomePage;
