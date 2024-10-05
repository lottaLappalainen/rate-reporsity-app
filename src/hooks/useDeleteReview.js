import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../components/graphQL/queries'; 

const useDeleteReview = (refetchReviews) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      refetchReviews(); 
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
    }
  });

  const handleDelete = (reviewId) => {
    return deleteReview({ variables: { id: reviewId } });
  };

  return { handleDelete };
};

export default useDeleteReview;
