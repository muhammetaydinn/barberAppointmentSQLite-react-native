import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { openDatabase } from 'react-native-sqlite-storage';
import InfoCard from '../components/InfoCard.js/InfoCard';
import RandevularCard from '../components/Randevular/Randevular';
import {SiteContext, useContext} from '../context/SiteContext';
const ppImage = 'https://pic.onlinewebfonts.com/svg/img_568656.png';
const mailImage =
  'https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png';
const phoneImage = 'http://cdn.onlinewebfonts.com/svg/img_558585.png';
const passwordImage =
  'https://www.pngmart.com/files/16/Vector-Key-PNG-Transparent-Image.png';
const appointments = 'Randevularım';
const header = 'Kullanıcı Bilgilerim';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
//user eklemek istersen

const userId = 1;


  // setUserData(results.rows.item(0)); or alert
 


const Second = ({ navigation }) => {
  const {allBarbers, setAllBarbers, db, myAppo, setMyAppo} =
    useContext(SiteContext);
  let [userData, setUserData] = useState({});
  
    const renderRandevularCard = ({item}) => {
      return (
        <RandevularCard
      
          item={item}
          navigation={navigation}></RandevularCard>
      );
    };
   function getUserData() {
     db.transaction(tx => {
       tx.executeSql(
         'SELECT * FROM users where id = ?',
         [userId],
         (tx, results) => {
           var len = results.rows.length;
           if (len > 0) {
             setUserData(results.rows.item(0));
           } else {
             //alert('No user found');
           }
         },
       );
     });
  }
  const getMyAppointments = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM appointments where userId = ?',
        [userId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var temp = [];
            for (let index = 0; index < len; index++) {
              temp.push(results.rows.item(index));
            }
            setMyAppo(temp);
          } else {
             setMyAppo(temp);
          }
        },
      );
    });
  };
  useEffect(() => {
    getUserData();
    getMyAppointments();
  }, []);
  console.log(myAppo);
 
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.profile}
          source={{
            uri: ppImage,
          }}></Image>
      </View>
      <View style={styles.space}></View>
      <View>
        <Text style={styles.header_text}>{header}</Text>
      </View>
      <View style={styles.space3}></View>
      <InfoCard text={userData.name} imageUri={ppImage}></InfoCard>
      <View style={styles.seperator} />
      <InfoCard text={userData.email} imageUri={mailImage} />
      <View style={styles.seperator} />
      <InfoCard text={userData.phone} imageUri={phoneImage}></InfoCard>
      <View style={styles.seperator} />
      <InfoCard text={userData.password} imageUri={passwordImage}></InfoCard>
      <View style={styles.seperator} />
      <View style={{marginTop: 15}}>
        <Text style={styles.header_text}>{appointments}</Text>
        <Button
          title="ilk veri getir"
          onPress={() => {
            getMyAppointments();
            console.log(myAppo);
          }}></Button>
      </View>
      {false ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={myAppo}
          renderItem={renderRandevularCard}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: w * 0.2,
    height: w * 0.2,
    alignSelf: 'center',
    marginTop: 50,
  },
  space: {height: h * 0.01},
  header_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  space3: {height: h * 0.03},
  seperator: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
});


export default Second;
