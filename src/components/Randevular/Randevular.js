import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    location: 'default',
    name: 'SqliteDb',
  },
  () => {
    console.log('başarılı');
  },
  err => {
    console.log('hata');
  },
);
//TODO: NAME BOOLUPDATEFALSE
const RandevularCard = ({ item, navigation }) => {

  const [barberName, setBarberName] = useState("");
  const [barberPhone, setBarberPhone] = useState('');

  const getBarberName =() =>{
    console.log('getBarberName');
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM barbers where id = ?',
        [item.barberId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setBarberName(results.rows.item(0).name);
            setBarberPhone(results.rows.item(0).phone)
          } else {
            alert("randevunuz bulunmamaktadır");
          }
        },
      );
    });
  }
 
  useEffect(() => {
    getBarberName();
  },[])
 
  function randevuIptalBool(date, barberId) {
     const checkToday = diffInToday(date);
   var value =
     checkToday == 0
       ? 'UPDATE barbers set today=? where id=?'
       : checkToday == 1
       ? 'UPDATE barbers set tomorrow=? where id=?'
          : checkToday == 2 ? 'UPDATE barbers set nextDay=? where id=?' : "";
     console.log(value);
     db.transaction(tx => {
       tx.executeSql(value, [0, barberId], (tx, results) => {
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
   

  }
  function deleteFromAppointments(id) {
    //Id ile silersin
    //delete From APPOİNTMENTS
    db.transaction(
      function (tx) {
        var query = 'DELETE FROM appointments WHERE id = ?';
        tx.executeSql(
          query,
          [id],
          function (tx, res) {
            console.log('removeId: ' + res.insertId);
            console.log('rowsAffected: ' + res.rowsAffected);
          },
          function (tx, error) {
            console.log('DELETE error: ' + error.message);
          },
        );
      },
    );
  }

  //TODO: moment library dif
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
  {
  }
  const createTwoButtonAlert = (id, barberId, date) => {
    console.log('>>>>> date ' + date);

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
            //TODO:
            randevuIptalBool(date,barberId);
            deleteFromAppointments(id);
          

          },
        },
      ],
    );
  };
   function goBack() {
     navigation.goBack();
   }

 
    

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.innest_container1}>
          <Text style={styles.date_text}>{item.date}</Text>
        </View>
        {false ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <Text style={styles.barber_label}>{barberName}</Text>
            <Text style={styles.barber_address}>{item.address} </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.barber_address}>{barberPhone}</Text>

              <TouchableOpacity
                onPress={() => {
                  console.log(
                    '>>>>> alınan randevunun berber idsi:' + item.kuaforid,
                  ); // alınan randevunun berber idsi
                  console.log(
                    '>>>>> musterinin aldıgı randevu idsi: ' + item._id,
                  ); //musterinin aldıgı randevu idssi
                  createTwoButtonAlert(item.id, item.barberId, item.date);
                }}>
                <View style={styles.cancel_button}>
                  <Text style={{fontSize: 17, fontWeight: '900'}}>
                    Iptal Et
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
  },
  inner_container: {
    height: Dimensions.get('window').height * 0.25,
    margin: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  innest_container1: {
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: 'purple',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  date_text: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  barber_label: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 21,
    color: 'white',
    fontWeight: '500',
  },
  barber_address: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  cancel_button: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.2,
    backgroundColor: '#ff77a9',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default RandevularCard;
/*
'UPDATE barbers set today=? tomorrow'
*/