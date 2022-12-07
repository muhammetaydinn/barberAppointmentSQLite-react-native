import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import styles from './InfoCard.style';
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
      <View style={{width: Dimensions.get('window').width * 0.02}}></View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default InfoCard;
