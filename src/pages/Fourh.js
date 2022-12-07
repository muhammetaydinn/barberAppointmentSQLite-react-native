import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import BarberRandevularCard from '../components/BarberRandevular/BarberRandevular';
import SQLite from 'react-native-sqlite-storage';
import { openDatabase } from 'react-native-sqlite-storage';
import {SiteContext, useContext} from '../context/SiteContext';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const genderImage1 =
  'https://t4.ftcdn.net/jpg/03/15/14/91/240_F_315149199_Dxpjpgtl2nZ6aw7Q8dPfn8O2mrK4zFy2.jpg';
const genderImage2 =
  'https://thumbs.dreamstime.com/b/dise%C3%B1o-retro-de-barberman-que-sostiene-las-podadoras-112127255.jpg';
const text1 = 'Kuaför Bilgilerim';
const ppImage = 'https://pic.onlinewebfonts.com/svg/img_568656.png';
const emailImage =
  'https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png';
const phoneImage = 'http://cdn.onlinewebfonts.com/svg/img_558585.png';
const addressImage =
  'https://pixsector.com/cache/2102b688/av924d89f198e4e084336.png';
const passwordText = '********';
const passwordImage =
  'https://www.pngmart.com/files/16/Vector-Key-PNG-Transparent-Image.png';
const randevularimText = 'Randevularım';
const isim = 'Haydar Haydarolu';
const numara = '+90 555 555 55 55';
const cancelText = 'İptal Et';




export default function Fourth({ navigation }) {
   const {
     allBarbers,
     setAllBarbers,
     db,
     myAppo,
     setMyAppo,
     barberAppo,
     setBarberAppo,
  } = useContext(SiteContext);
  const renderBarberRandevularCard = ({item}) => {
    return (
      <BarberRandevularCard item={item} navigation={navigation}></BarberRandevularCard>
    );
  };

  useEffect(() => {
    getBarberData();
    getBarberAppointments();
    
  },[])

  const [currentBarberId, setCurrentBarberId] = useState(1);
  const [barberData, setBarberData] = useState({});
  


  // Bizim berberin bilgilerini getiriyor useEffect ile lazım
  const getBarberData = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM barbers where id = ?',
          [currentBarberId],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              setBarberData(results.rows.item(0));
            } else {
              //alert('No user found');
            }
          },
        );
      });
  }

  //Bizim berberin randevularını  randevular tablosundan getiriyor
const getBarberAppointments = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM appointments where barberId = ?',
      [currentBarberId],
      (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var temp = [];
          for (let index = 0; index < len; index++) {
            temp.push(results.rows.item(index));
          }
          setBarberAppo(temp);
        } else {
          //alert('No user found');
        }
      },
    );
  });
};

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <ImageBackground
            style={styles.images_bg}
            source={{
              uri: barberData.gender ? genderImage1 : genderImage2,
            }}></ImageBackground>
        </View>
        <View style={styles.view1}></View>
        <View>
          <Text style={styles.text1}>{text1}</Text>
        </View>
        <InfoCard text={barberData.name} imageUri={ppImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={barberData.email} imageUri={emailImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={barberData.phone} imageUri={phoneImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={barberData.address} imageUri={addressImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard text={passwordText} imageUri={passwordImage}></InfoCard>
        <View style={styles.view3} />
        <View style={styles.view4}>
          <Text style={styles.text2}>{randevularimText}</Text>
        </View>
      </View>
        {barberData.today == null ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <FlatList
            data={barberAppo}
            renderItem={renderBarberRandevularCard}
            keyExtractor={item => item.id}
          />
        )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images_bg: {
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.2,
  },
  cancel_button: {
    width: w * 0.2,
    height: h * 0.05,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 5,
  },

  //       Texts

  text1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    paddingTop: 10,
  },
  text2: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  text3: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
    marginLeft: 20,
  },
  text4: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  text5: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  //         Views

  view1: {height: h * 0.01},
  view3: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
  view4: {marginTop: 15},
  view5: {
    height: h * 0.2,
    backgroundColor: 'gray',
    borderRadius: 5,
    margin: 10,
  },
  view6: {
    height: h * 0.06,
    backgroundColor: 'purple',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  view7: {flexDirection: 'row', flex: 1, borderRadius: 5},
  view8: {flex: 2},
  view9: {flex: 1, justifyContent: 'center'},
});
