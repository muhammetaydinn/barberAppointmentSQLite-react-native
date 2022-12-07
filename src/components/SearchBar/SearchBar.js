import React from "react";
import { View,  StyleSheet,  TextInput } from "react-native";
const SearchBar = props => {
    
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={props.onSearch}
          style={styles.textInput}
          placeholder="Search... "
        />
      </View>
    );
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: '#e0e0e0',
        padding: 5,
        margin: 5,
    borderRadius: 5,
    },
    textInput: {
        height: 40,
        
    },  
});

export default SearchBar;