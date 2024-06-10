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
              margin: '20px 0',
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backgroundImage:
                'linear-gradient(135deg, rgb(22, 7, 238), rgb(206, 160, 251))',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 5s ease infinite',
              boxShadow: '0px 3px 15px rgba(0, 0, 0, 0)',
              transition: 'background-position 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                backgroundPosition: '100% 100%',
              },
              '&:active': {
                boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            component={Link}
            to="/books"
          >
            Explore
          </Button>
        </Box>

        <hr className="hr1" />

        <Box sx={{ padding: '2em' }}>
          <Typography
            sx={{
              fontSize: '1.7em',
              fontWeight: 'bold',
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#222',
              marginBottom: '1em',
              textAlign: 'center',
            }}
          >
            The Enchanting History of my Library Club
          </Typography>
          <hr className="hr2" />
          <Typography
            sx={{
              fontSize: '1.2em',
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#444',
              marginBottom: '1.5em',
              textAlign: 'justify',
              padding: '0 2em',
            }}
          >
            From a young age, my love for reading was evident. I started delving
            into children's fairy tales at the age of five, and as I grew older,
            my tastes evolved to include dramas, horrors, detective stories,
            and, of course, fantasy novels. Books became my sanctuary, a place
            where I could explore new worlds and experience endless adventures.
          </Typography>
          <Typography
            sx={{
              fontSize: '1.2em',
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#444',
              marginBottom: '1.5em',
              textAlign: 'justify',
              padding: '0 2em',
            }}
          >
            However, life took a challenging turn during my teenage years. I
            faced dark and difficult times, and my once-beloved books were set
            aside for nearly four years. It felt as though I had lost a crucial
            part of myself. Then, in July 2022, a spark was reignited. I
            stumbled upon a review on BookTok, where a passionate fan of fantasy
            literature shared their thoughts on a new release. Intrigued, I
            decided to give the book a try.
          </Typography>
          <Typography
            sx={{
              fontSize: '1.2em',
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#444',
              marginBottom: '1.5em',
              textAlign: 'justify',
              padding: '0 2em',
            }}
          >
            That decision changed everything. As I immersed myself in the story,
            my long-lost passion for reading was rekindled. I began to build an
            extensive electronic library, filled with works from some of the
            most renowned authors in contemporary fantasy, particularly within
            the young adult genre. Books once again became my refuge, guiding me
            out of the shadows and into a world of imagination and wonder.
          </Typography>
          <Typography
            sx={{
              fontSize: '1.2em',
              fontFamily: 'Arial, Helvetica, sans-serif',
              color: '#444',
              marginBottom: '1.5em',
              textAlign: 'justify',
              padding: '0 2em',
            }}
          >
            Inspired by my journey and the profound impact that books had on my
            life, I decided to create a space where others could find solace and
            inspiration through reading. Thus, the Fantasy Library Club was
            born. This club is a haven for literary enthusiasts, a community
            where the love for books and the magic of storytelling can flourish.
            It is my hope that through my club, others will discover, or
            rediscover, the joy and transformative power of reading, just as I
            did.
          </Typography>
        </Box>
      </div>
      <Footer />
      <Outlet />
    </Box>
  );
}
export default HomePage;
