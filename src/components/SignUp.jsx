import React from 'react';
import { View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from './theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(5, 'Username too short')
    .max(30, 'Username too long'),
  password: yup.string()
    .required('Password is required')
    .min(5, 'Password too short')
    .max(50, 'Password too long'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const InputField = ({ placeholder, value, onChangeText, secureTextEntry, error }) => {
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      color: theme.colors.textPrimary,
      borderColor: error ? '#d73a4a' : theme.colors.textSecondary,
    },
    errorText: {
      color: '#d73a4a',
      marginBottom: 10,
    },
  });

  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const styles = StyleSheet.create({
    container: {
      padding: 20,
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
  });

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        error={formik.touched.username && formik.errors.username}
      />
      <InputField
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        error={formik.touched.password && formik.errors.password}
      />
      <InputField
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        secureTextEntry
        error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signUp({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={handleSubmit} />;
};

export default SignUp;
