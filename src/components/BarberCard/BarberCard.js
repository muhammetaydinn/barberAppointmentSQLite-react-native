import React from "react";
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

const BarberCard = ({ item, onSelect }) => {
  
 
  
    return (
      <TouchableWithoutFeedback onPress={onSelect}>
        <View style={styles.container}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );  
};

const styles = StyleSheet.create({
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

    }


    
});

export default BarberCard;