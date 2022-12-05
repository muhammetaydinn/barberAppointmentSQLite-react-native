import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
import BarberCard from '../components/BarberCard/BarberCard';
const db = SQLite.openDatabase(
  {
    location: 'default',
    name: 'SqliteDb',
  },
  () => {
  },
  err => {
    console.log('hata');
  },
);
const First = ({ navigation }) => {
  const [data, setData] = useState([]);
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
    console.log('createUsersTable');
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
          console.log("idFirst "+item.id);
        }}
      />
    );
  };
  
  const readRecord = () => {
     db.transaction(tx => {
       tx.executeSql('SELECT * FROM barbers', [], (tx, result) => {
         //console.log('result', result);
         //console.log('length' + result.rows.length);
         var temp = [];
         for (let index = 0; index < result.rows.length; index++) {
           //console.log(result.rows.item(index));
           temp.push(result.rows.item(index));
         }
         setData(temp);
         console.log('data lengthFirst' + data.length);
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
        data={data}
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
