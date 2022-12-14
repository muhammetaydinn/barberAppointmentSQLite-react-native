import {StyleSheet, Dimensions} from 'react-native';
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
  view1: {height: h * 0.13},
  view2: {height: h * 0.035},
  text1: {marginLeft: 15, fontSize: 16, fontWeight: '700'},
  view3: {height: h * 0.07},
  view4: {height: h * 0.1},
  text2: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  view5: {width: w * 0.1},
  view6: {height: h * 0.05},
  view7: {alignItems: 'center'},
});
