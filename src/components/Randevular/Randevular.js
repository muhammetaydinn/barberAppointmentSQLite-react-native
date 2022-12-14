import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SiteContext, useContext} from '../../context/SiteContext';
import styles from './Randevular.style';
//TODO: NAME BOOLUPDATEFALSE
const RandevularCard = ({item, navigation}) => {
  const {db, wholeBarbers, myBarberAppointments, userAppointments} =
    useContext(SiteContext);

  const [barberName, setBarberName] = useState('');
  const [barberPhone, setBarberPhone] = useState('');
  const [barberAddress, setBarberAddress] = useState('');

  const getBarberName = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM barbers where id = ?',
        [item.barberId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setBarberName(results.rows.item(0).name);
            setBarberPhone(results.rows.item(0).phone);
            setBarberAddress(results.rows.item(0).address);
          } else {
            alert('randevunuz bulunmamaktadır');
          }
        },
      );
    });
  };

  useEffect(() => {
    getBarberName();
    userAppointments();
  }, []);

  function randevuIptalBool(date, barberId) {
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
  function deleteFromAppointments(id) {
    //Id ile silersin
    //delete From APPOİNTMENTS
    db.transaction(function (tx) {
      var query = 'DELETE FROM appointments WHERE id = ?';
      tx.executeSql(
        query,
        [id],
        function (tx, res) {
          console.log('rowsAffected: ' + res.rowsAffected);
        },
        function (tx, error) {
          console.log('DELETE error: ' + error.message);
        },
      );
    });
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
            randevuIptalBool(date, barberId);
            deleteFromAppointments(id);
            wholeBarbers();
            userAppointments();
            myBarberAppointments();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.innest_container1}>
          <Text style={styles.date_text}>{item.date}</Text>
        </View>
        {
          <View>
            <Text style={styles.barber_label}>{barberName}</Text>
            <Text style={styles.barber_address}>{barberAddress} </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.barber_address}>{barberPhone}</Text>

              <TouchableOpacity
                onPress={() => {
                  console.log('>>>>>berber idsi:' + item.barberId); // alınan randevunun berber idsi
                  console.log('>>>>> randevu idsi: ' + item.id); //musterinin aldıgı randevu idssi
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
        }
      </View>
    </View>
  );
};

export default RandevularCard;
/*
'UPDATE barbers set today=? tomorrow'
*/
