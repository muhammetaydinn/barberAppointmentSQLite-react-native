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
  Switch,Alert, ScrollView
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {SiteContext, useContext} from '../context/SiteContext';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
 



//"SELECT name FROM sqlite_master WHERE type='table' AND name='barbers'",
const Fifth = () => {
  const [cliked, setClicked] = useState(false);
  const {
    allBarbers,
    setAllBarbers,
    db,
    barberAppo,
    setBarberAppo,
    myAppo,
    setMyAppo,
  } = useContext(SiteContext);
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
        <View style={{height: h * 0.13}}>
          <View style={{height: h * 0.035}}>
            <Text style={{marginLeft: 15, fontSize: 16, fontWeight: '700'}}>
              {ph}
            </Text>
          </View>
          <View style={{height: h * 0.07}}>
            <TextInput
              maxLength={ml}
              style={styles.container}
              placeholder={ph}
              onChangeText={newText => setA(newText)}
              defaultValue={a}
            />
          </View>
          <View style={{height: h * 0.1}} />
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
            readRecord();
          },
        },
      ]);
    };
    //with error handling
    const addBarber = (
    ) => {
      db.transaction(tx => {
        try
        {
          tx.executeSql(
            'INSERT INTO barbers (email , name , address  , phone ,today , tomorrow, nextDay ,gender ) VALUES(?,?,?,?,?,?,?,?)',
            [mail, name, address, phone, today, tomorrow,nextDay, isEnabled],
            (tx, result) => {
              console.log('tx', tx);
              console.log('result', result.rowsAffected);
            },
          );
        }
        catch (e)
        {
          console.log(e);
        }
      });
    };
    //ID
  const getMyAppointments = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM appointments where userId = ?',
        [1],
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
    const readRecord = () => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM barbers', [], (tx, result) => {
          var temp = [];
          for (let index = 0; index < result.rows.length; index++) {
            temp.push(result.rows.item(index));
          }
          setAllBarbers(temp);
          console.log('setAllBarbers lengthFirst' + allBarbers.length);
        });
      });
    };
    const deleteRecord =() => {
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
          <View style={{height: h * 0.1}}>
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Kuaför Ekleme Paneli
            </Text>
          </View>

          {Kutu(name, setName, 'Kuaför Adını Yazın', 30)}
          {Kutu(mail, setMail, 'Mail Adresinizi Yazın', 30)}
          {Kutu(phone, setPhone, 'Telefon Numaranızı Yazın (GSM)', 10)}
          {Kutu(address, setAddress, 'Adresinizi Yazın', 75)}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: 15, fontSize: 16, fontWeight: '700'}}>
              Kadın Kuaförü müsünüz ?
            </Text>
            <View style={{width: w * 0.1}}></View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled == 1 ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled == 1}
            />
          </View>

          <View style={{height: h * 0.05}} />
          <View style={{alignItems: 'center'}}>
            <Button
              color={'gray'}
              onPress={() => {
                if (
                  name.length <= 5 ||
                  mail.length < 5 ||
                  phone.length != 10 ||
                  address.length <= 5
                ) {
                  alert('Lütfen tüm alanları doldurunuz');
                } else {
                  createTwoButtonAlert(
                    'Kontrol Edin',
                    'Adı: ' +
                      name +
                      '\n' +
                      'mail: ' +
                      mail +
                      '\n' +
                      'telefon: ' +
                      phone +
                      '\n' +
                      'adres: ' +
                      address +
                      '\n' +
                      'cinsiyet: ' +
                      (isEnabled ? 'kadın' : 'erkek'),
                    mail,
                    name,
                    address,
                    isEnabled,
                    phone,
                  );
                }
              }}
              title="     EKLE     "
            />
          </View>
          <View>
            {/* <Button title="Ekle" onPress={createRecord} /> */}
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Kuaför Silme Paneli
            </Text>
            {Kutu(deletingId, setDeletingId, 'Sileceğiniz kuafor idsi', 2)}
            <Button title="Sil" onPress={() => {
              deleteRecord();
              readRecord();
            }} />
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Kullanıcı Ekleme Paneli
            </Text>
            <Button
              title="Kullanıcı Ekle"
              onPress={() => {
                addUser();
                setClicked(true);
                getMyAppointments();
                
              }}
              disabled={cliked}></Button>

            {/* <Button title="Oku" onPress={readRecord} /> */}
            <View style={{height: h * 0.05}} />
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
});




