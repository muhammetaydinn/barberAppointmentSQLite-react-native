import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.2,
    width: Dimensions.get('window').width / 2 - 10,

    backgroundColor: 'gray',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
