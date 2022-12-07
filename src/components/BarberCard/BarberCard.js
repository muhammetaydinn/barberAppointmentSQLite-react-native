import React from "react";
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './BarberCard.style'
const BarberCard = ({ item, onSelect }) => {
    return (
      <TouchableWithoutFeedback onPress={onSelect}>
        <View style={styles.container}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );  
};
export default BarberCard;