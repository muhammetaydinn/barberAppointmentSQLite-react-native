import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Dimensions,
  SafeAreaView,
  TextInput,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { SiteContext, useContext } from '../../context/SiteContext';
//import styles from './Fifth.style'
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
import { Strings } from '../../constants/Strings';
const nameLimit = 5;
const mailLimit = 5;
const phoneLimit = 10;
const addressLimit = 5;
const nameLimitMax = 30;
const mailLimitMax = 30;
const addressLimitMax = 75;
//"SELECT name FROM sqlite_master WHERE type='table' AND name='barbers'",
const Fifth = () => {
  const [cliked, setClicked] = useState(false);
  const {db, wholeBarbers, userAppointments} = useContext(SiteContext);
  const addUser = () => {
    db.transaction(tx => {
      try {
        tx.executeSql(
          'INSERT INTO users (email , name , phone  , password) VALUES(?,?,?,?)',
          ['hamdiHamdi@gmail.com', 'Hamdi hamdi', '5412563791', 'hamdi!1qAz'],
          (tx, result) => {
            console.log('tx', tx);
            console.log('result', result.rowsAffected);
            alert('kullanıcı Eklendi');
          },
        );
      } catch (e) {
        console.log(e);
      }
    });
  };

  const [today, setToday] = useState(0);
  const [tomorrow, setTomorrow] = useState(0);
  const [nextDay, setNextDay] = useState(0);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  //const [gender, setGender] = useState(false); false = kadın, true = erkek
  const [isEnabled, setIsEnabled] = useState(0);

  const [deletingId, setDeletingId] = useState(0);

  // id email name address gender phone today tomorrow nextDay
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS barbers (id INTEGER PRIMARY KEY AUTOINCREMENT , email TEXT,name TEXT, address TEXT , gender INTEGER , phone TEXT , today INTEGER , tomorrow INTEGER , nextDay INTEGER )',
        [],
        (tx, result) => {
          console.log('tx', tx);
          console.log('result', result);
        },
      );
    });
  }, []);
  const toggleSwitch = () => {
    if (isEnabled == 0) {
      setIsEnabled(1);
    } else {
      setIsEnabled(0);
    }

    console.log(!isEnabled ? 'kadın' : 'erkek');
  };
  function Kutu(a, setA, ph, ml) {
    return (
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.text1}>
            {ph}
          </Text>
        </View>
        <View style={styles.view3}>
          <TextInput
            maxLength={ml}
            style={styles.container}
            placeholder={ph}
            onChangeText={newText => setA(newText)}
            defaultValue={a}
          />
        </View>
        <View style={styles.view4} />
      </View>
    );
  }
  const createTwoButtonAlert = (
    fm,
    sm,
    email,
    name,
    address,
    gender,
    phone,
  ) => {
    Alert.alert(fm, sm, [
      {
        text: 'Hayır',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Evet',
        onPress: () => {
          //TODO:null kontrolü yapılacak
          //use english
          console.log(
            '>>>>> email:' +
              email +
              '\n' +
              '>>>>> name:' +
              name +
              '\n' +
              '>>>>> address:' +
              address +
              'phone:' +
              phone,
          );
          addBarber();
          wholeBarbers();
        },
      },
    ]);
  };
  //with error handling
  const addBarber = () => {
    db.transaction(tx => {
      try {
        tx.executeSql(
          'INSERT INTO barbers (email , name , address  , phone ,today , tomorrow, nextDay ,gender ) VALUES(?,?,?,?,?,?,?,?)',
          [mail, name, address, phone, today, tomorrow, nextDay, isEnabled],
          (tx, result) => {
            console.log('tx', tx);
            console.log('result', result.rowsAffected);
          },
        );
      } catch (e) {
        console.log(e);
      }
    });
  };
  //ID

  const deleteRecord = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM barbers where id = ? ',
        [deletingId],
        (tx, result) => {
          console.log(`tx`, tx);
          console.log(`result`, result);
        },
      );
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.view4}>
          <Text style={styles.text2}>{Strings.barber_add_panel}</Text>
        </View>

        {Kutu(name, setName, Strings.enter_barber_name, nameLimitMax)}
        {Kutu(mail, setMail, Strings.enter_mail_address, mailLimitMax)}
        {Kutu(phone, setPhone, Strings.enter_phone_number, phoneLimit)}
        {Kutu(address, setAddress, Strings.enter_address, addressLimitMax)}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 15, fontSize: 16, fontWeight: '700'}}>
            {Strings.are_you_women_barber}
          </Text>
          <View style={styles.view5}></View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled == 1 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled == 1}
          />
        </View>

        <View style={styles.view6} />
        <View style={styles.view7}>
          <Button
            color={'gray'}
            onPress={() => {
              if (name.length <= nameLimit) {
                alert('İsim ' + nameLimit + ' karakterden fazla olmalıdır.');
              } else if (mail.length <= mailLimit) {
                alert('Mail ' + mailLimit + ' karakterden fazla olmalıdır');
              } else if (phone.length != phoneLimit) {
                alert(
                  'Telefon nunmarası ' + phoneLimit + ' karakter olmalıdır',
                );
              } else if (address.length <= addressLimit) {
                alert(
                  'adres ' + addressLimit + ' karakterden fazla olmalıdır.',
                );
              } else {
                createTwoButtonAlert(
                  'Kontrol Edin',
                  'Adı: ' +
                    name +
                    '\nmail: ' +
                    mail +
                    '\ntelefon: ' +
                    phone +
                    '\nadres: ' +
                    address +
                    '\ncinsiyet: ' +
                    (isEnabled ? 'kadın' : 'erkek'),
                  mail,
                  name,
                  address,
                  isEnabled,
                  phone,
                );
              }
            }}
            title={Strings.add}
          />
        </View>
        <View>
          {/* <Button title="Ekle" onPress={createRecord} /> */}
          <Text style={styles.text2}>{Strings.barber_remove_panel}</Text>
          {Kutu(deletingId, setDeletingId, Strings.barber_id_delete, 2)}
          <Button
            title={Strings.delete}
            onPress={() => {
              deleteRecord();
              wholeBarbers();
            }}
          />
          <Text
            style={styles.text2}>
            {Strings.user_add_panel}
          </Text>
          <Button
            title={Strings.add_user}
            onPress={() => {
              addUser();
              setClicked(true);
              userAppointments();
            }}
            disabled={cliked}></Button>

          <View style={styles.view6} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fifth;


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    height: h * 0.07,
    borderColor: 'gray',
    borderWidth: 1,
  },
  view1: {height: h * 0.13},
  view2: {height: h * 0.035},
  text1: {marginLeft: 15, fontSize: 16, fontWeight: '700'},
  view3: {height: h * 0.07},
  view4: {height: h * 0.1},
  text2: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  view5: {width: w * 0.1},
  view6: {height: h * 0.05},
  view7: {alignItems: 'center'},
 
});
