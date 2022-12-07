import { StyleSheet, Dimensions } from 'react-native';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: w * 0.2,
    height: w * 0.2,
    alignSelf: 'center',
    marginTop: 50,
  },
  space: {height: h * 0.01},
  header_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  space3: {height: h * 0.03},
  seperator: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
});
