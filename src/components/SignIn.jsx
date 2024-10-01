import React from 'react';
import { View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from './theme';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  passWord: yup.string().required('Password is required'),
});

const initialValues = {
  userName: '',
  passWord: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
      borderColor: formik.touched.userName && formik.errors.userName ? '#d73a4a' : theme.colors.textSecondary, 
    },
    passwordInput: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      color: theme.colors.textPrimary,
      borderColor: formik.touched.passWord && formik.errors.passWord ? '#d73a4a' : theme.colors.textSecondary, 
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

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.userName}
        onChangeText={formik.handleChange('userName')}
        style={styles.input}
      />
      {formik.touched.userName && formik.errors.userName && (
        <Text style={styles.errorText}>{formik.errors.userName}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.passWord}
        onChangeText={formik.handleChange('passWord')}
        secureTextEntry
        style={styles.passwordInput}
      />
      {formik.touched.passWord && formik.errors.passWord && (
        <Text style={styles.errorText}>{formik.errors.passWord}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={handleSubmit} />;
};

export default SignIn;
