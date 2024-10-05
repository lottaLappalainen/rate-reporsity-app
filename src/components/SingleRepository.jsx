import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REVIEWS } from './graphQL/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  review: {
    marginTop: 10,
  },
  ratingCircle: {
    width: 34,
    height: 34,
    borderRadius: 17, 
    borderWidth: 3,
    borderColor: '#9700ff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: '#9700ff', 
    fontWeight: 'bold',
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} singleView="yes" />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.node.rating}</Text> 
        </View>
        <View style={styles.flexItem}>
          <Text style={{ fontWeight: 'bold' }}>{review.node.user.username}</Text>
          <Text color="textSecondary">{formatDate(review.node.createdAt)}</Text> 
          <Text style={styles.review}>{review.node.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { loading: loadingRepository, error: errorRepository, data: repoData } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  const { loading: loadingReviews, error: errorReviews, data: reviewData } = useQuery(GET_REVIEWS, {
    variables: { id },
  });

  if (loadingRepository || loadingReviews) return <ActivityIndicator size="large" color="#0000ff" />;
  if (errorRepository || errorReviews) return <Text>Error: {errorRepository?.message || errorReviews?.message}</Text>;

  const repository = repoData?.repository;
  const reviews = reviewData?.repository?.reviews.edges || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
