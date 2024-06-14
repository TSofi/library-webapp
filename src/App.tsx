import React from 'react';
import LoginForm from './login-form/LoginForm';
import HomePage from './HomePage/HomePage';
import BookList from './BookDetails/BookList';
import About from './HomePage/About';
import HelpPage from './menu-app-bar/HelpPage';
import LoansPage from './BookDetails/LoansPage/LoansPage';
import AddBook from './Admins_Pages/AddBook';
import AddUser from './Admins_Pages/AddUser';

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
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/admin/addBook" element={<AddBook />} />
        <Route path="/admin/addUser" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
