import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e8e8e8',
  },
  pickerContainer: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 5,
  },
  search: {
    margin: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, onRepositoryPress, selectedSort, setSelectedSort, searchQuery, setSearchQuery }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <>
    <View>
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSort}
          onValueChange={(itemValue) => setSelectedSort(itemValue)}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highestRated" />
          <Picker.Item label="Lowest rated repositories" value="lowestRated" />
        </Picker>
      </View>

      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => onRepositoryPress(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest'); 
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchKeyword] = useDebounce(searchQuery, 1000);
  const navigate = useNavigate();

  const getSortingVariables = () => {
    switch (selectedSort) {
      case 'highestRated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowestRated':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { orderBy, orderDirection } = getSortingVariables();
  const { repositories } = useRepositories(orderBy, orderDirection, searchKeyword);
  console.log(searchKeyword)

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={handleRepositoryPress}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
