import {StyleSheet, Dimensions} from 'react-native';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
export  default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  a: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
  image: {
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.2,
  },
  barberLabel: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  viewAlign: {
    borderRadius: 15,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  barber_label_text: {
    width: Dimensions.get('window').width,
    borderWidth: 1,
    textAlign: 'center',

    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    backgroundColor: 'white',
    opacity: 0.8,
  },
  header_text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  dayView: {
    height: h * 0.08,
    backgroundColor: 'brown',
    borderRadius: 15,
    margin: 10,
    justifyContent: 'center',
  },
  day_text_style: {textAlign: 'center', fontSize: 20, color: 'white'},
  isAvailableView: {
    height: h * 0.05,
    borderRadius: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  isAvailableText: {textAlign: 'center', fontSize: 20, color: 'white'},
});