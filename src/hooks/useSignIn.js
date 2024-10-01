import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE_USER } from '../components/graphQL/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient(); 
  const [mutate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    if (data.authenticate.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
    }

    await apolloClient.resetStore(); 
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
