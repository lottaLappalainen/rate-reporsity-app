import { StyleSheet, View } from 'react-native';

import { Route, Routes} from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from './theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<CreateReview />} />
      </Routes>
    </View>
  );
};

export default Main;