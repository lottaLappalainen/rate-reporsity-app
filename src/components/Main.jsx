import { StyleSheet, View } from 'react-native';

import { Route, Routes} from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from './theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview'
import SignUp from './SignUp';
import MyReviews from './MyReviews'

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
        <Route path="sign-in" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-reviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;