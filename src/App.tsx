import React from 'react';
import LoginForm from './login-form/LoginForm';
import HomePage from './HomePage/HomePage';
import BookList from './BookDetails/BookList';
import About from './HomePage/About';
import HelpPage from './menu-app-bar/HelpPage';
import AddBook from './Admins_Pages/AddBook';
import AddUser from './Admins_Pages/AddUser';
import AddLoan from './Admins_Pages/AddLoan';
import MyLoans from './LoansPage/MyLoans';

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
        <Route path="/take_loan" element={<MyLoans />} />
        <Route path="/admin/addBook" element={<AddBook />} />
        <Route path="/admin/addUser" element={<AddUser />} />
        <Route path="/admin/addLoan" element={<AddLoan />} />
      </Routes>
    </Router>
  );
}

export default App;
