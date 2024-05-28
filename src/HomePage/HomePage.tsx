import { Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <MenuAppBar />
      <div className="boxContainer">
        <p className="title">Welcome to your best Library App</p>
        <hr />
        <p className="description">write welcome text</p>
        <p className="description">smaller text for description.</p>
        <Button variant="contained" component={Link} to="/books" sx={{ m: 1 }}>
          Books
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default HomePage;
