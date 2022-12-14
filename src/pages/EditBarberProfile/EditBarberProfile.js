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
import {Strings} from '../../constants/Strings';
import { SiteContext, useContext } from '../../context/SiteContext';
import styles from './EditBarberProfile.style';
const nameLimit = 5;
const mailLimit = 5;
const phoneLimit = 10;
const addressLimit = 5;
const nameLimitMax = 30;
const mailLimitMax = 30;
const addressLimitMax = 75;
export default function EditBarberProfile({ navigation }) {
  
  const {db, wholeBarbers, myBarberAppointments, userAppointments} =
    useContext(SiteContext);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEnabled, setIsEnabled] = useState(0);
  const getBarberData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM barbers where id = ?',
        [1],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setName(results.rows.item(0).name);
            setMail(results.rows.item(0).email);
            setPhone(results.rows.item(0).phone);
            setAddress(results.rows.item(0).address);
            setIsEnabled(results.rows.item(0).gender);
          } else {
            console.log('No barbers found');
          }
        },
      );
    });
  };
  const toggleSwitch = () => {
    if (isEnabled == 0) {
      setIsEnabled(1);
    } else {
      setIsEnabled(0);
    }

    console.log(!isEnabled ? 'kadın' : 'erkek');
  };
  useEffect(() => {
    getBarberData();
  }, []);

  function Kutu(a, setA, ph, ml) {
    return (
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.text1}>{ph}</Text>
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
  //  mail,name,phone,isEnabled,
  const createTwoButtonAlert = (fm, sm, email, name, phone, isEnabled,address) => {
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
            `email: ${email}\n name: ${name}\n phone: ${phone}\n gender: ${
              isEnabled ? 'kadın' : 'erkek'
            } \n address: ${address}`,
          );
          updateBarber();
          userAppointments();
          
        },
      },
    ]);
  };
  //with error handling
  const updateBarber = () => {
    console.log(`updateBarber`);
       db.transaction(tx => {
         tx.executeSql(
           'UPDATE barbers set name=?,email=?,phone=?,gender=?,address=? where id=?',
           [name, mail, phone, isEnabled,address, 1],
           (tx, results) => {
             if (results.rowsAffected > 0) {
               Alert.alert(
                 'Success',
                 'User updated successfully',
                 [
                   {
                     text: 'Ok',
                     onPress: () => {
                       userAppointments();
                       wholeBarbers();
                       myBarberAppointments();
                       console.log('userAppointments');
                     },
                   },
                 ],
                 {cancelable: false},
               );
             } else alert('Updation Failed');
           },
         );
       });

    
  };
  //ID

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.view4}>
          <Text style={styles.text2}>{Strings.edit_profile}</Text>
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
                  'Adres ' + addressLimit + ' karakterden fazla olmalıdır.',
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
                  phone,
                  isEnabled,
                  address
                );
              }
            }}
            title={Strings.update}
          />
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

