import React from 'react';
import { View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from './theme';

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
  .number()
  .required('Rating is required')
  .min(1, 'Rating must be at least 1')
  .max(100, 'Rating must be at most 100'),
  review: yup.string(),
});

const initialValues = {
  repositoryName: '',
  repositoryOwner: '',
  rating: '',
  review: '',
};

const CustomTextInput = ({ placeholder, value, onChangeText, error, touched }) => {
  const borderColor = touched && error ? '#d73a4a' : theme.colors.textSecondary;

  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { borderColor }]}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Repository owner name"
        value={formik.values.repositoryOwner}
        onChangeText={formik.handleChange('repositoryOwner')}
        error={formik.errors.repositoryOwner}
        touched={formik.touched.repositoryOwner}
      />
      <CustomTextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        error={formik.errors.repositoryName}
        touched={formik.touched.repositoryName}
      />
      <CustomTextInput
        placeholder="Rating"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        error={formik.errors.rating}
        touched={formik.touched.rating}
      />
      <CustomTextInput
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        error={formik.errors.review}
        touched={formik.touched.review}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, review } = values;
    try {
      const data = await createReview({ repositoryOwner, repositoryName, rating, review });
      navigate(`/repository/${data.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  

  return <CreateReviewContainer onSubmit={handleSubmit} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: theme.colors.textPrimary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
});

export default CreateReview;
