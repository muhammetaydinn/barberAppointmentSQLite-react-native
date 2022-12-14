import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import BarberCard from '../../components/BarberCard/BarberCard';
import {SiteContext, useContext} from '../../context/SiteContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import SwitchSelector from 'react-native-switch-selector';
import { Images } from '../../constants/Images';
import styles from './First.style'
const First = ({navigation}) => {
  const {allBarbers, db, list2, wholeBarbers} = useContext(SiteContext);
  const [list, setList] = useState(allBarbers);
  const [gender, setGender] = useState(false);

  const handleBarberSelect = id => {
    navigation.navigate('Third', {id});
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
      const filteredList = {};
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

 

  const renderBarberCard = ({item}) => {
    return (
      <BarberCard
        item={item}
        onSelect={() => {
          handleBarberSelect(item.id);
        }}
      />
    );
  };

  useEffect(() => {
    wholeBarbers();
    setList(allBarbers);
  }, []);

  return (
    <View>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <SearchBar onSearch={handleSearch} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Second')}
          style={styles.touchable}>
          <Image
            style={styles.image}
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
          {label: 'Kad??n', value: false},
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
        <View style={styles.view3}>
          <View style={styles.view4}></View>

          <Text style={styles.text}>
            Berber Yok Berber Eklemek ????in Admin K??sm??na Gidin
          </Text>
        </View>
      )}
    </View>
  );
};


export default First;
