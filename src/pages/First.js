import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
import BarberCard from '../components/BarberCard/BarberCard';
import { SiteContext,useContext } from '../context/SiteContext';

const First = ({ navigation }) => {
  const { allBarbers, setAllBarbers , db} = useContext(SiteContext);
  const handleBarberSelect = id => {
    navigation.navigate('Third', { id });
  };
  function createUsersTable() {
    console.log('createUsersTable');
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT , email TEXT, name TEXT , phone TEXT ,password TEXT )',
        [],
        (tx, result) => {
          console.log('tx', tx);
          console.log('result', result);
        },
      );
    });
  }
  function createTimeTable() {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS dateTime (id INTEGER PRIMARY KEY AUTOINCREMENT , date TEXT)',
        [],
        (tx, result) => {
          console.log('tx', tx);
          console.log('result', result);
        },
      );
    });
  }
 

  
    
  const renderBarberCard = ({ item }) => {
    return (
      <BarberCard
        item={item}
        onSelect={() => {
          handleBarberSelect(item.id);
        }}
      />
    );
  };
  
  const readRecord = () => {
     db.transaction(tx => {
       tx.executeSql('SELECT * FROM barbers', [], (tx, result) => {
         var temp = [];
         for (let index = 0; index < result.rows.length; index++) {
           temp.push(result.rows.item(index));
         }
         setAllBarbers(temp);
         console.log('setAllBarbers lengthFirst' + allBarbers.length);
       });
     });
   };
  useEffect(
    () => {
      readRecord();
      createUsersTable();
      createTimeTable();
    },
    [],
  );

 
    
  
  return (
    <View>
    
      <Button title="Profile" onPress={() => {
        navigation.navigate('Second');
      }}></Button>
      <Button title="getBarbers" onPress={readRecord}></Button>

      <FlatList
        data={allBarbers}
        renderItem={renderBarberCard}
        //refreshing={false}
        //onRefresh={getBarbers}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default First;
