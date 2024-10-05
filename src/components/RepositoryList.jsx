import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native'; 

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e8e8e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onRepositoryPress }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}> 
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate(); 

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`); 
  };

  return <RepositoryListContainer repositories={repositories} onRepositoryPress={handleRepositoryPress} />;
};

export default RepositoryList;
