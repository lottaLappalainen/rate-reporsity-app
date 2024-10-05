import React from 'react';
import { View, FlatList, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER} from './graphQL/queries'; 
import { DELETE_REVIEW } from './graphQL/mutations'; 
import ReviewItem from './ReviewItem';
import theme from './theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e8e8e8',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    gap: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, 
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewButtons = ({ url, reviewId, refetchReviews }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      refetchReviews();
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
    }
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteReview({ variables: { id: reviewId } })
        }
      ]
    );
  };

  const handlePress = () => {
    Linking.openURL(url); 
  };
      
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>View Repository</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete review</Text>
      </Pressable>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data!</Text>;

  const reviews = data?.me?.reviews.edges || [];

  const renderItem = ({ item }) => (
    <View>
      <ReviewItem 
        review={item} 
        ownerName={item.node.repository.ownerName} 
        repositoryName={item.node.repository.name} 
      />
      <ReviewButtons url={item.node.repository.url} reviewId={item.node.id} refetchReviews={refetch} />
    </View>
  );

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem} 
      keyExtractor={({ node }) => node.id}
    />
  );
};

export default MyReviews;
