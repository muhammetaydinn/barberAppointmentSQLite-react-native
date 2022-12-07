import { StyleSheet, Dimensions } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {flexDirection: 'row'},
  view2: {
    width: (Dimensions.get('window').width / 5.0) * 4,
  },
  touchable: {
    width: (Dimensions.get('window').width / 5.0) * 1,
  },
  image: {flex: 1, resizeMode: 'center', tintColor: 'gray'},
  view3: {alignSelf: 'center'},
  view4: {height: Dimensions.get('window').height * 0.2},
  text: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
});