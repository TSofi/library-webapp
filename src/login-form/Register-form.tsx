import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { mainButtonStyle } from '../menu-app-bar/buttonStyle';
import './Register_form.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent<any, Event> | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(5, 'Password too short'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup
          .string()
          .email('Invalid email')
          .required('Email is required'),
        role: yup.string().required('Role is required'),
      }),
    [],
  );

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const response = await axios.post(
          'http://localhost:8081/api/auth/register',
          values,
        );

        if (response.status === 200 || response.status === 201) {
          navigate('/login');
        } else {
          setOpen(true);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setOpen(true);
      }
    },
    [navigate],
  );

  return (
    <div className="background-image">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error">
          Registration failed. Please check your information and try again.
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <div className="register-form-container">
            <h1>REGISTER</h1>
            <form
              className="register-form"
              id="registerForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                id="username"
                label="Username"
                variant="standard"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="standard"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <TextField
                id="firstName"
                label="First Name"
                variant="standard"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="standard"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="role"
                label="Role"
                variant="standard"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                error={formik.touched.role && !!formik.errors.role}
                helperText={formik.touched.role && formik.errors.role}
              />
              <Button
                className="register-button"
                variant="contained"
                type="submit"
                form="registerForm"
                disabled={!(formik.isValid && formik.dirty)}
                sx={mainButtonStyle}
              >
                Register
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
