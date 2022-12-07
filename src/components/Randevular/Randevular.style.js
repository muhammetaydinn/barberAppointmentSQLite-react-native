import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
  },
  inner_container: {
    height: Dimensions.get('window').height * 0.25,
    margin: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  innest_container1: {
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: 'purple',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  date_text: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  barber_label: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 21,
    color: 'white',
    fontWeight: '500',
  },
  barber_address: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
    cancel_button: {
        height: Dimensions.get('window').height * 0.05,
        width: Dimensions.get('window').width * 0.2,
        backgroundColor: '#ff77a9',
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});