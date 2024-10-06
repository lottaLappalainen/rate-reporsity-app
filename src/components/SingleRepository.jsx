import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY, GET_REVIEWS } from './graphQL/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} singleView="yes" />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e8e8e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const first = 5; 

  const { loading: loadingRepository, error: errorRepository, data: repoData } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  const {
    loading: loadingReviews,
    error: errorReviews,
    data: reviewData,
    fetchMore,
  } = useQuery(GET_REVIEWS, {
    variables: { id, first },
    fetchPolicy: 'cache-and-network',
  });

  if (loadingRepository || loadingReviews) return <ActivityIndicator size="large" color="#0000ff" />;
  if (errorRepository || errorReviews) return <Text>Error: {errorRepository?.message || errorReviews?.message}</Text>;

  const repository = repoData?.repository;
  const reviews = reviewData?.repository?.reviews.edges || [];
  const pageInfo = reviewData?.repository?.reviews.pageInfo;

  const handleEndReached = () => {
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          id,
          first,
          after: pageInfo.endCursor,
        },
      });
    }
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5} 
    />
  );
};

export default SingleRepository;
