import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
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
  review: {
    marginTop: 10,
  },
});

const ReviewItem = ({ review, ownerName, repositoryName }) => {
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
          {ownerName && repositoryName ? (
            <Text style={{ fontWeight: 'bold' }}>
              {ownerName}/{repositoryName}
            </Text>
          ) : (
            <Text style={{ fontWeight: 'bold' }}>{review.node.user.username}</Text>
          )}
          <Text style={{ color: 'gray' }}>{formatDate(review.node.createdAt)}</Text>
          <Text style={styles.review}>{review.node.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
