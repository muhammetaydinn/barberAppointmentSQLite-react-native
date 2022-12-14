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
import styles from './EditProfile.style';
const nameLimit = 5;
const mailLimit = 5;
const phoneLimit = 10;
const passwordLimit = 5;
const nameLimitMax = 30;
const mailLimitMax = 30;
const passwordLimitMax = 30;
export default function EditProfile({navigation}) {
  const {db, wholeBarbers, myBarberAppointments} = useContext(SiteContext);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const getUserData = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users where id = ?',
          [1],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
                setName(results.rows.item(0).name);
                setMail(results.rows.item(0).email);
                setPhone(results.rows.item(0).phone);
            } else {
              console.log('No user found');
            }
          },
        );
      });
    };
    useEffect(() => {
        getUserData();
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
    // mail,name,password,phone,
  const createTwoButtonAlert = (fm, sm, email, name, password, phone) => {
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
            `email: ${email}\n name: ${name}\n phone: ${phone}\n password: ${password}\n`,
          );
            updateUser();
            myBarberAppointments();
        },
      },
    ]);
  };
  //with error handling
    const updateUser = () => {
        console.log(`updateUser`);
      
        db.transaction(tx => {
          tx.executeSql('UPDATE users set name=?,email=?,phone=?,password=? where id=?', [name,mail,phone,password, 1], (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User updated successfully',
                [
                  {
                    text: 'Ok',
                        onPress: () => {
                            myBarberAppointments();
                            console.log('myBarberAppointments');
                    },
                  },
                ],
                {cancelable: false},
              );
            } else alert('Updation Failed');
          });
        });
  };
  //ID



  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.view4}>
          <Text style={styles.text2}>{Strings.edit_profile}</Text>
        </View>

        {Kutu(name, setName, Strings.enter_name, nameLimitMax)}
        {Kutu(mail, setMail, Strings.enter_mail_address, mailLimitMax)}
        {Kutu(phone, setPhone, Strings.enter_phone_number, phoneLimit)}
        {Kutu(password, setPassword, Strings.enter_password, passwordLimitMax)}
        {Kutu(
          password2,
          setPassword2,
          Strings.enter_password_again,
          passwordLimitMax,
        )}

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
              } else if (password.length <= passwordLimit) {
                alert(
                  'Şifre ' + passwordLimit + ' karakterden fazla olmalıdır.',
                );
              } else if (password != password2) {
                alert('Şifreler eşleşmiyor');
              } else {
                createTwoButtonAlert(
                  'Kontrol Edin',
                  'Adı: ' +
                    name +
                    '\nmail: ' +
                    mail +
                    '\ntelefon: ' +
                    phone +
                    '\nşifre: ' +
                    password,
                  mail,
                  name,
                  password,
                  phone,
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
