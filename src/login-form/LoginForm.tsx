import './Login_form.css';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { mainButtonStyle } from '../menu-app-bar/buttonStyle';
import axios, { AxiosInstance } from 'axios';
import { useApi } from '../backend/ApiProvider';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = { username: '', password: '' };
  const [open, setOpen] = useState(location.state?.error || false);
  const apiClient = useApi();

  const handleClose = (
    event: React.SyntheticEvent<any, Event> | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = useCallback(
    async (values: { username: string; password: string }, formik: any) => {
      try {
        console.log('Submitting login form with values:', values);
        const response = await apiClient.login(values);

        console.log('Response:', response);

        if (response.statusCode === 200 || response.statusCode === 201) {
          //const { token } = response.data;
          //localStorage.setItem('token', token);
          console.log('Token saved to localStorage');
          navigate('/home');
          console.log('Navigation to /home triggered');
        } else {
          console.log('Login failed with status:', response.statusCode);
          setOpen(true);
        }
      } catch (error) {
        console.error('Login error:', error);
        setOpen(true);
      }
    },
    [navigate],
  );

  const handleAbout = useCallback(() => {
    navigate('/about');
  }, [navigate]);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
      }),
    [],
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
          Login failed. Please check what you write and try again.
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
          <div className="login-form-container">
            <h1>WELCOME IN LIBRARY</h1>
            <h2>PLEASE LOGIN</h2>
            <div style={{ height: 20 }} />
            <hr />
            <div style={{ height: 60 }} />
            <form
              className="login-form"
              id="signForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                className="error-message"
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
                className="error-message"
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
              <div style={{ height: 20 }} />
              <Button
                className="login-button"
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
                form="signForm"
                disabled={!(formik.isValid && formik.dirty)}
                sx={mainButtonStyle}
              >
                Login
              </Button>
            </form>

            <div className="about-box">
              <p>
                If you don't have an account, please check the rules on how you
                can be accepted into the club.
              </p>
              <Button
                className="about-button"
                variant="contained"
                onClick={handleAbout}
                sx={mainButtonStyle}
              >
                About
              </Button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
