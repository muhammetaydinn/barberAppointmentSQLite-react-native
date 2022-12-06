import React, {isValidElement, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import SQLite from 'react-native-sqlite-storage';
import {SiteContext, useContext} from '../context/SiteContext';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const manBarberImage ='https://t4.ftcdn.net/jpg/03/15/14/91/240_F_315149199_Dxpjpgtl2nZ6aw7Q8dPfn8O2mrK4zFy2.jpg';
const womenBarberImage ='https://thumbs.dreamstime.com/b/dise%C3%B1o-retro-de-barberman-que-sostiene-las-podadoras-112127255.jpg';
const ppImage = 'https://pic.onlinewebfonts.com/svg/img_568656.png';
const mailImage ='https://www.freepnglogos.com/uploads/email-png/company-email-svg-png-icon-download-18.png';
const phoneImage = 'http://cdn.onlinewebfonts.com/svg/img_558585.png';
const addressImage ='https://pixsector.com/cache/2102b688/av924d89f198e4e084336.png';
const make_appointment = 'Randevu Al';
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
    allBarbers,
    setAllBarbers,
    db,
    barberAppo,
    setBarberAppo,
    myAppo,
    setMyAppo,
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
  const readRecord = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM barbers', [], (tx, result) => {
        var temp = [];
        for (let index = 0; index < result.rows.length; index++) {
          temp.push(result.rows.item(index));
        }
        setAllBarbers(temp);
      });
    });
  };
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

  function createAppointmentsTable() {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT , barberId INTEGER , userId INTEGER ,  address TEXT , date TEXT)',
        [],
        (tx, result) => {
          console.log('tx', tx);
          console.log('result', result);
        },
      );
    });
  }

  useEffect(() => {
    getBarbers();
    createAppointmentsTable();
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
  const getBarberAppointments = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM appointments where barberId = ?',
        [1],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var temp = [];
            for (let index = 0; index < len; index++) {
              temp.push(results.rows.item(index));
            }
            setBarberAppo(temp);
          } else {
            setBarberAppo(temp);
          }
        },
      );
    });
  };
  const randevuAl = (date, address, type) => {
    // boolean and appointmets
    updateUser(type);
    addAppointments(address, date);
    getBarbers();
    readRecord();
    getBarberAppointments();
    getMyAppointments();
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
                uri: userData.gender == 1 ? manBarberImage : womenBarberImage,
              }}>
              <View style={styles.barberLabel}>
                <View style={styles.viewAlign}>
                  <Text style={styles.barber_label_text}>{userData.name}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <InfoCard text={userData.name} imageUri={ppImage}></InfoCard>
          <View style={styles.a} />
          <InfoCard text={userData.email} imageUri={mailImage}></InfoCard>
          <View style={styles.a} />
          <InfoCard text={userData.phone} imageUri={phoneImage}></InfoCard>
          <View style={styles.a} />
          <InfoCard text={userData.address} imageUri={addressImage}></InfoCard>
          <View style={styles.a} />
          <View style={{marginTop: 15}}>
            <Text style={styles.header_text}>{make_appointment}</Text>
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  a: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
  image: {
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.2,
  },
  barberLabel: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  viewAlign: {
    borderRadius: 15,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  barber_label_text: {
    width: Dimensions.get('window').width,
    borderWidth: 1,
    textAlign: 'center',

    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    backgroundColor: 'white',
    opacity: 0.8,
  },
  header_text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  dayView: {
    height: h * 0.08,
    backgroundColor: 'brown',
    borderRadius: 15,
    margin: 10,
    justifyContent: 'center',
  },
  day_text_style: {textAlign: 'center', fontSize: 20, color: 'white'},
  isAvailableView: {
    height: h * 0.05,
    borderRadius: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  isAvailableText: {textAlign: 'center', fontSize: 20, color: 'white'},
});
