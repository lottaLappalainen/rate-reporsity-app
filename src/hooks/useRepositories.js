import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../components/graphQL/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network', 
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;
