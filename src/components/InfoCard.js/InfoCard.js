import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';

const InfoCard = props => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: Dimensions.get('window').width * 0.1,
          height: Dimensions.get('window').width * 0.1,
        
        }}
        source={{
          uri: props.imageUri,
              }}></Image>
          <View style={{width:Dimensions.get('window').width*0.02}}>
              
          </View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    
    marginHorizontal:15,
        borderRadius: 10,
    marginTop:5,
   
  },
    text: {
        fontSize: 18,
        fontWeight:'500',
        color: 'black',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
    },
    
});

export default InfoCard;
