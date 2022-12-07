import { StyleSheet, Dimensions } from 'react-native';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    height: h * 0.07,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

