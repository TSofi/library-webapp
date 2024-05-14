import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container } from '@mui/material';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues: FormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log('Form submitted:', values);
    actions.setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ width: '100%', marginTop: '8px' }}>
              <Field
                as={TextField}
                id="email"
                name="email"
                label="Email Address"
                variant="standard"
                fullWidth
                autoComplete="email"
                error={errors.email && touched.email}
                helperText={errors.email && touched.email ? errors.email : ''}
              />
              <Field
                as={TextField}
                id="password"
                name="password"
                label="Password"
                variant="standard"
                fullWidth
                type="password"
                autoComplete="current-password"
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password ? errors.password : ''
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                style={{ marginTop: '24px' }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default LoginForm;
