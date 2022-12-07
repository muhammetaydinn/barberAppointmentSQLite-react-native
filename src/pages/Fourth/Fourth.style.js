import { StyleSheet, Dimensions } from 'react-native';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  images_bg: {
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.2,
  },
  cancel_button: {
    width: w * 0.2,
    height: h * 0.05,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 5,
  },

  //       Texts

  text1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    paddingTop: 10,
  },
  text2: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  text3: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
    marginLeft: 20,
  },
  text4: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  text5: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  //         Views

  view1: {height: h * 0.01},
  view3: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
  view4: {marginTop: 15},
  view5: {
    height: h * 0.2,
    backgroundColor: 'gray',
    borderRadius: 5,
    margin: 10,
  },
  view6: {
    height: h * 0.06,
    backgroundColor: 'purple',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  view7: {flexDirection: 'row', flex: 1, borderRadius: 5},
  view8: {flex: 2},
  view9: {flex: 1, justifyContent: 'center'},
});
