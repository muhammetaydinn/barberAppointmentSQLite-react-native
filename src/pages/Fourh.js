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
   const {allBarbers, setAllBarbers, db, myAppo, setMyAppo} =
     useContext(SiteContext);
  var todayy = new Date();
var tomorroww = new Date(todayy);
var nextDayy = new Date(todayy);
tomorroww.setDate(tomorroww.getDate() + 1);
nextDayy.setDate(nextDayy.getDate() + 2);
const today = todayy.toISOString().split('T')[0];
const tomorrow = tomorroww.toISOString().split('T')[0];
const nextDay = nextDayy.toISOString().split('T')[0];
  useEffect(() => {
    getBarberData();
    getBarberAppointments();
    
  },[])

  const [currentBarberId, setCurrentBarberId] = useState(1);
  const [barberData, setBarberData] = useState({});
  const [barberAppointments, setBarberAppointments] = useState({});
  const [filteredData, setFilteredData] = useState({});

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
          setBarberAppointments(temp);
        } else {
          //alert('No user found');
        }
      },
    );
  });
};
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
  
  function deleteFromAppointments(id) {
     db.transaction(tx => {
       tx.executeSql(
         'DELETE FROM appointments where id = ? ',
         [id],
         (tx, result) => {
           console.log(`tx`, tx);
           console.log(`result`, result);
         },
       );
     });
  }
  

  //TODO: BOOKMARKS EXTENSION SAVES TODOS
  function barberBoolCancel(date,barberId) {
    const checkToday = diffInToday(date);
    var value =
      checkToday == 0
        ? 'UPDATE barbers set today=? where id=?'
        : checkToday == 1
        ? 'UPDATE barbers set tomorrow=? where id=?'
        : checkToday == 2
        ? 'UPDATE barbers set nextDay=? where id=?'
        : '';
    db.transaction(tx => {
      tx.executeSql(value, [0, barberId], (tx, results) => {
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
   
   
  }
  //TODO:
  function diffInToday(date1) {
    var todayy = new Date();
    const today = todayy.toISOString().split('T')[0];
    const date2 = new Date(today); //bugünün normal formatı
    const date3 = new Date(date1); //date1 in normal formatı
    const Difference_In_Time = date2.getTime() - date3.getTime();
    const Difference_In_Days = Math.abs(
      Difference_In_Time / (1000 * 3600 * 24),
    );
    return parseInt(Difference_In_Days, 10);
  }
  //TODO:

  const createTwoButtonAlert = (date, a) => {
    Alert.alert(
      'Emin misiniz?',
      'Seçili Randevuyu iptal etmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            if (a[0].id >0) {
              console.log('id:', a[0].id + 'barberId: ', a[0].barberId);
              deleteFromAppointments(a[0].id);
              barberBoolCancel(date, a[0].barberId);
              getBarberAppointments();
              getBarberData();
              readRecord();
              console.log("-----------------");
              

            } else {
              console.log('+++++++GIREMEDI+++++++++++');
            }
          },
        },
      ],
    );
  };

  //card
  function myAppointmentCard(gunString) {
    return (
      <View style={styles.view5}>
        <View style={styles.view6}>
          <Text style={styles.text3}>{gunString}</Text>
        </View>
        <View style={styles.view7}>
          <View style={styles.view8}>
            <Text style={styles.text4}>{isim}</Text>
            <Text style={styles.text4}>{numara}</Text>
          </View>
          <View style={styles.view9}>
            <TouchableOpacity
              style={styles.cancel_button}
              onPress={() => {
                console.log("barberAppointments",barberAppointments)
                var a = barberAppointments
                  .filter(item => item.date == gunString)
                  .map(({id, date, barberId, userId}) => ({
                    id,
                    date,
                    barberId,
                    userId,
                  }));
                if (a.length > 0) {
                  console.log('a[0].id', a[0].id);
                  console.log('a[0].date', a[0].date);
                  console.log('a[0].barberId', a[0].barberId);
                  console.log('a[0].userId', a[0].userId);
                  setFilteredData(a);
                  createTwoButtonAlert(gunString, a);
                } else {
                  console.log(barberAppointments)
                  alert("Verı gözükmyüor ya da tarih sorunu TEKRAR DENE")
                }
                
              }}>
              <Text style={styles.text5}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }



  //TODO: naming style
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
      >
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
        <View style={styles.view2}></View>
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
        {barberData.today==null ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
            <View>
              <Button title='yenile' onPress={() => {
                getBarberData();
              }}></Button>
            <View>{barberData.today==1 ? myAppointmentCard(today) : null}</View>
            <View>
              {barberData.tomorrow==1 ? myAppointmentCard(tomorrow) : null}
            </View>
            <View>
              {barberData.nextDay==1 ? myAppointmentCard(nextDay) : null}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {},
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
  view2: {height: h * 0.03},
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
