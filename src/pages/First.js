import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import BarberCard from '../components/BarberCard/BarberCard';
import { SiteContext,useContext } from '../context/SiteContext';
import SearchBar from '../components/SearchBar/SearchBar';
import SwitchSelector from 'react-native-switch-selector';
import {Images} from "../constants/Images"
const First = ({ navigation }) => {

  const {allBarbers,  db, list2,wholeBarbers} =
    useContext(SiteContext);
   const [list, setList] = useState(allBarbers);
  const [gender, setGender] = useState(false);

    
  const handleBarberSelect = id => {
    navigation.navigate('Third', { id });
  };
    
   

  const handleSearch = text => {
    if (list2.length > 0) {
      const filteredList = list2.filter(barber => {
        const searchedText = text.toLowerCase();
        const currentTitle = barber.name.toLowerCase();
        return currentTitle.indexOf(searchedText) > -1;
      });
      setList(filteredList);
    } else {
      const filteredList = {}
      setList(filteredList);
    }
    
  };
  const handleGender = value => {
     if (list2.length > 0) {
       const filteredlist = list2.filter(item => {
         return !item.gender == value;
       });

       setList(filteredlist);
     } else {
       const filteredList = {};
       setList(filteredList);
     }
    
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
  
 
  useEffect(
    () => {
      wholeBarbers();
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
              uri: Images.profilePic,
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
      {list2.length > 0 ? (
        <FlatList
          data={list}
          renderItem={renderBarberCard}
          //refreshing={false}
          //onRefresh={getBarbers}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      ) : (
          <View style={{ alignSelf: 'center' }}>
            <View style={{height:Dimensions.get('window').height*0.2}}></View>
            
            <Text style={{ flex: 1 , textAlign:'center', marginHorizontal:50 , fontSize:20,fontWeight:'bold'}}>Berber Yok Berber Eklemek İçin Admin Kısmına Gidin</Text>
           
            
        </View>
      )}
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
