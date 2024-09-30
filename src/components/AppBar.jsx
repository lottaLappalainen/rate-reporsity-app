import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native'; 
import Constants from 'expo-constants';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    padding: 15,
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal style={styles.scrollView}>
    <Pressable><Link to ="/"><Text color = "navText" >Reporsities</Text></Link></Pressable>
    <Pressable><Link to ="*"><Text color = "navText" >Sign in</Text></Link></Pressable>
    </ScrollView>
  </View>;
};

export default AppBar;