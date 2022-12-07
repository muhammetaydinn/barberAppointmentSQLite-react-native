import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {SiteContext, useContext} from '../../context/SiteContext';
import styles from './BarberRandevular.style';
//TODO: NAME BOOLUPDATEFALSE
const BarberRandevularCard = ({item, navigation}) => {
  console.log('BarberRandevular ITEM: ', item);
  const {db, wholeBarbers, myBarberAppointments, userAppointments} =
    useContext(SiteContext);

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const getUserName = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users where id = ?',
        [item.userId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setUserName(results.rows.item(0).name);
            setUserPhone(results.rows.item(0).phone);
          } else {
            alert('randevunuz bulunmamaktadır');
          }
        },
      );
    });
  };

  useEffect(() => {
    getUserName();
    myBarberAppointments();
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
    console.log('checkToday:[' + checkToday + ']');
    db.transaction(tx => {
      tx.executeSql(value, [0, 1], (tx, results) => {
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
            randevuIptalBool(date);
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
            <Text style={styles.barber_label}>{userName}</Text>
            <Text style={styles.barber_address}>{} </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.barber_address}>{userPhone}</Text>

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

export default BarberRandevularCard;
