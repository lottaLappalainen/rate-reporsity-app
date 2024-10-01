import { ApolloClient, InMemoryCache } from '@apollo/client';


const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://192.168.36.53:4000/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;