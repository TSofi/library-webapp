import React from 'react';
import LoginForm from './login-form/LoginForm';
import HomePage from './HomePage/HomePage';
import BookList from './BookDetails/BookList';
import About from './HomePage/About';
import HelpPage from './menu-app-bar/HelpPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
