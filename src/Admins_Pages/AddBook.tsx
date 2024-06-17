import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import axios from 'axios';
import { LibraryClient, ClientResponse } from '../backend/libraryClient';

interface BookFormValues {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  availableCopies: number;
}

const validationSchema = yup.object({
  isbn: yup.string().required('ISBN is required'),
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  publisher: yup.string().required('Publisher is required'),
  publicationYear: yup
    .number()
    .required('Publication year is required')
    .min(1000, 'Publication year must be at least 1000'),
  availableCopies: yup
    .number()
    .required('Available copies is required')
    .min(0, 'Available copies must be at least 0'),
});

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const client = new LibraryClient();

  const addBook = async (values: BookFormValues) => {
    return { success: true, statusCode: 200 };
  };
  const handleSubmit = async (
    values: BookFormValues,
    { setSubmitting }: FormikHelpers<BookFormValues>,
  ) => {
    const response = await addBook(values);
    if (response.success) {
      client.addBook(values);

      navigate('/books');
    } else {
      alert(`Failed to add book: ${response.statusCode}`);
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
          Add a New Book
        </Typography>
        <Formik
          initialValues={{
            isbn: '',
            title: '',
            author: '',
            publisher: '',
            publicationYear: 0,
            availableCopies: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                label="ISBN"
                name="isbn"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.isbn}
                onChange={handleChange}
                error={touched.isbn && Boolean(errors.isbn)}
                helperText={touched.isbn && errors.isbn}
              />
              <Field
                as={TextField}
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.title}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <Field
                as={TextField}
                label="Author"
                name="author"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.author}
                onChange={handleChange}
                error={touched.author && Boolean(errors.author)}
                helperText={touched.author && errors.author}
              />
              <Field
                as={TextField}
                label="Publisher"
                name="publisher"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.publisher}
                onChange={handleChange}
                error={touched.publisher && Boolean(errors.publisher)}
                helperText={touched.publisher && errors.publisher}
              />
              <Field
                as={TextField}
                label="Publication Year"
                name="publicationYear"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={values.publicationYear}
                onChange={handleChange}
                error={
                  touched.publicationYear && Boolean(errors.publicationYear)
                }
                helperText={touched.publicationYear && errors.publicationYear}
              />
              <Field
                as={TextField}
                label="Available Copies"
                name="availableCopies"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={values.availableCopies}
                onChange={handleChange}
                error={
                  touched.availableCopies && Boolean(errors.availableCopies)
                }
                helperText={touched.availableCopies && errors.availableCopies}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Book
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddBook;
