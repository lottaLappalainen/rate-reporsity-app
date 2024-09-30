import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';  

const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  flexContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  flexItem: {
    display: 'flex',
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
      <Image
        source={{ uri: item.ownerAvatarUrl }}
        style={styles.image}
      />
      <View style={styles.flexItem}>
      <Text fontWeight="bold">{item.fullName}</Text>
      <Text color="textSecondary">{item.description}</Text>
      </View>
      </View>
      <View style={styles.flexContainer2}>
      <View style={styles.flexItem}>
      <Text style={styles.label} color="textSecondary">Stars</Text>
      <Text fontWeight="bold">{formatNumber(item.stargazersCount)}</Text>
      </View>
      <View style={styles.flexItem}>
      <Text style={styles.label} color="textSecondary">Forks</Text>
      <Text fontWeight="bold">{formatNumber(item.forksCount)}</Text>
      </View>

      <View style={styles.flexItem}>
      <Text style={styles.label} color="textSecondary">Reviews</Text>
      <Text fontWeight="bold">{item.reviewCount}</Text>
      </View>

      <View style={styles.flexItem}>
      <Text style={styles.label} color="textSecondary">Rating</Text>
      <Text fontWeight="bold">{item.ratingAverage}</Text>
      </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
