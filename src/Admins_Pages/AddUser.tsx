import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import { useApi } from '../backend/ApiProvider'; // Import useApi hook
import { RegisterDto, RegisterResponseDto } from '../DTO-s/registerDTO';

interface UserFormValues {
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ROLE_READER' | 'ROLE_ADMIN';
}

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
  username: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.mixed().oneOf(['ROLE_READER', 'ROLE_ADMIN'], 'Role is required'),
});

const AddUser: React.FC = () => {
  const apiClient = useApi(); // Use useApi hook to get ApiClient from context
  const navigate = useNavigate();

  const handleSubmit = async (
    values: UserFormValues,
    { setSubmitting }: FormikHelpers<UserFormValues>,
  ) => {
    try {
      const response = await apiClient.register(values);

      if (response.success) {
        alert('User added successfully');
        navigate('/admin/users');
      } else {
        alert(`Failed to add user: ${response.statusCode}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user');
    }

    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(src/assets/images/AdminWallp.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <MenuAppBar />
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
          mt: 10,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add a New User
        </Typography>
        <Formik
          initialValues={{
            password: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            role: 'ROLE_READER', // Set default role here if needed
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                label="First Name"
                name="firstName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <Field
                as={TextField}
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                label="Role"
                name="role"
                variant="outlined"
                fullWidth
                select
                margin="normal"
                value={values.role}
                onChange={handleChange}
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="ROLE_READER">Reader</option>
                <option value="ROLE_ADMIN">Admin</option>
              </Field>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add User
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddUser;
