import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
import BarberCard from '../components/BarberCard/BarberCard';
import { SiteContext,useContext } from '../context/SiteContext';
import SearchBar from '../components/SearchBar/SearchBar';
import SwitchSelector from 'react-native-switch-selector';
const First = ({ navigation }) => {

  const {allBarbers, setAllBarbers, db, list2, setList2} =
    useContext(SiteContext);
   const [list, setList] = useState(allBarbers);
  const [gender, setGender] = useState(false);

    
  const handleBarberSelect = id => {
    navigation.navigate('Third', { id });
  };
    
   

  const handleSearch = text => {
    const filteredList = list2.filter(barber => {
      const searchedText = text.toLowerCase();
      const currentTitle = barber.name.toLowerCase();
      return currentTitle.indexOf(searchedText) > -1;
    });
    setList(filteredList);
  };
  const handleGender = value => {
    const filteredlist = list2.filter(item => {
      return !item.gender == value;
    });

    setList(filteredlist);
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
         setList2(temp)
         console.log('setAllBarbers lengthFirst' + allBarbers.length);
       });
     });
   };
  useEffect(
    () => {
      readRecord();
      createUsersTable();
      createTimeTable();
      setList(allBarbers);
  
    },
    [],
  );

 
    
  
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: (Dimensions.get('window').width / 5.0) * 4,
          }}>
          <SearchBar onSearch={handleSearch} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Second')}
          style={{
            width: (Dimensions.get('window').width / 5.0) * 1,
          }}>
          <Image
            style={{flex: 1, resizeMode: 'center', tintColor: 'gray'}}
            source={{
              uri: 'https://pic.onlinewebfonts.com/svg/img_568656.png',
            }}></Image>
        </TouchableOpacity>
      </View>
      <SwitchSelector
        initial={1}
        onPress={value => {
          //console.log(value);
          setGender(value);
          handleGender(value);
        }}
        textColor={'gray'} //'#7a44cf'
        selectedColor={'white'}
        buttonColor={'gray'}
        borderColor={'gray'}
        hasPadding
        options={[
          {label: 'Erkek', value: true},
          {label: 'Kadın', value: false},
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />

      <FlatList
        data={list}
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
