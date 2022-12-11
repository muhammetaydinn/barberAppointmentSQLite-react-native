import React, {isValidElement, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../../components/InfoCard.js/InfoCard';
import { SiteContext, useContext } from '../../context/SiteContext';
import styles from './Third.style'
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
import {Images} from '../../constants/Images';
import {Strings} from '../../constants/Strings';
// //TODO:  if (!inputUserId) {
//       alert('Please fill User id');
//       return;
//     }

var todayy = new Date();
var tomorroww = new Date(todayy);
var nextDayy = new Date(todayy);
tomorroww.setDate(tomorroww.getDate() + 1);
nextDayy.setDate(nextDayy.getDate() + 2);
const today1 = todayy.toISOString().split('T')[0];
const tomorrow1 = tomorroww.toISOString().split('T')[0];
const nextDay1 = nextDayy.toISOString().split('T')[0];

//Useefffect kullan
export default function Third({ route, navigation }) {
  const {
    db,
    wholeBarbers,
    myBarberAppointments,
    userAppointments,
  } = useContext(SiteContext);
  let [userData, setUserData] = useState({});
  const _id = route.params.id;
  // setUserData(results.rows.item(0)); or alert
  function getBarbers() {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM barbers where id = ?',
        [_id],
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
  
   

  

  useEffect(() => {
    getBarbers();
  }, []);

  //to randevuAl(_id, day, data.address, type);
  const createTwoButtonAlert = (day, type) =>
    Alert.alert(
      'Randevuyu Onayla',
      `${day} tarihi için randevu almak istediğinize emin misiniz`,
      [
        {
          text: 'Hayır',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            randevuAl( day, userData.address, type);
            console.log(
              'day',
              day,
              'userdata',
              userData,
              'type',
              type,
            );
          },
        },
      ],
    );
  
  let updateUser = type => {
    var value =
      type == '0'
        ? "UPDATE barbers set today=? where id=?"
        : type == '1'
        ? "UPDATE barbers set tomorrow=? where id=?"
          : "UPDATE barbers set nextDay=? where id=?";
    db.transaction(tx => {
      tx.executeSql(value, [1, _id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'User updated successfully',
            [
              {
                text: 'Ok',
                onPress: () => {},
              },
            ],
            {cancelable: false},
          );
        } else alert('Updation Failed');
      });
    });
  };

  function addAppointments(address, date) {
    db.transaction(tx => {
      try {
        tx.executeSql(
          'INSERT INTO appointments (barberId , userId , address  , date ) VALUES(?,?,?,?)',
          [_id, 1, address, date],
          (tx, result) => {
            console.log('addAppointmentstx', tx);
            console.log('addAppointmentsResult', result.rowsAffected);
          },
        );
      } catch (e) {
        console.log(e);
      }
    });
  }
 
  const randevuAl = (date, address, type) => {
    // boolean and appointmets
    updateUser(type);
    addAppointments(address, date);
    getBarbers();
    wholeBarbers();
    myBarberAppointments();
    userAppointments();
  };
  //createTwoButtonAlert(day, type)}>
  function myAppointments(day, isAvailable, type) {
    return (
      <View>
        <View style={styles.dayView}>
          <Text style={styles.day_text_style}>{day}</Text>
        </View>
        <TouchableOpacity
          disabled={isAvailable == 1}
          onPress={() => createTwoButtonAlert(day, type)}>
          <View
            style={[
              styles.isAvailableView,
              {backgroundColor: !(isAvailable == 1) ? 'green' : 'gray'},
            ]}>
            <Text style={styles.isAvailableText}>
              {!(isAvailable == 1) ? 'Müsait' : 'Meşgul'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View>
          <View>
            <ImageBackground
              style={styles.image}
              source={{
                uri:
                  userData.gender == 1
                    ? Images.manBarberImage
                    : Images.womenBarberImage,
              }}>
              <View style={styles.barberLabel}>
                <View style={styles.viewAlign}>
                  <Text style={styles.barber_label_text}>{userData.name}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <InfoCard
            text={userData.name}
            imageUri={'https://pic.onlinewebfonts.com/svg/img_568656.png'}></InfoCard>
          <View style={styles.a} />
          <InfoCard
            text={userData.email}
            imageUri={Images.mailImage}></InfoCard>
          <View style={styles.a} />
          <InfoCard
            text={userData.phone}
            imageUri={Images.phoneImage}></InfoCard>
          <View style={styles.a} />
          <InfoCard text={userData.address} imageUri={Images.addressImage}></InfoCard>
          <View style={styles.a} />
          <View style={{marginTop: 15}}>
            <Text style={styles.header_text}>{Strings.make_appointment}</Text>
          </View>
          {myAppointments(today1, userData.today, '0')}
          {myAppointments(tomorrow1, userData.tomorrow, '1')}
          {myAppointments(nextDay1, userData.nextDay, '2')}
        </View>
        <View style={{height: 70}} />
      </ScrollView>
    </SafeAreaView>
  );
}


