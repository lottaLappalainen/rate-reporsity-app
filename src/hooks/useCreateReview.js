import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../components/graphQL/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryOwner, repositoryName, rating, review }) => {
    const { data } = await mutate({
      variables: { 
        review: { 
          ownerName: repositoryOwner, 
          repositoryName, 
          rating: Number(rating),
          text: review 
        },
      },
    });
    return data.createReview; 
  };

  return [createReview, result];
};

export default useCreateReview;
