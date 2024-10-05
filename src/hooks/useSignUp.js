import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../components/graphQL/mutations';
import useSignIn from './useSignIn'; 

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();  

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: { username, password },
      },
    });

    if (data) {
      try {
        await signIn({ username, password });
        return data;
      } catch (e) {
        console.log(e);
        throw new Error('SignIn after SignUp failed');
      }
    }
  };

  return [signUp, result];
};

export default useSignUp;
