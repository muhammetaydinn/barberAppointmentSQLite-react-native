import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import InfoCard from '../components/InfoCard.js/InfoCard';
import RandevularCard from '../components/Randevular/Randevular';
import { SiteContext, useContext } from '../context/SiteContext';
import { Images } from '../constants/Images';
import { Strings } from '../constants/Strings';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
//user eklemek istersen

const userId = 1;

const Second = ({ navigation }) => {
  const { db, myAppo,  userAppointments} =
    useContext(SiteContext);
  let [userData, setUserData] = useState({});
  
    const renderRandevularCard = ({item}) => {
      return (
        <RandevularCard
      
          item={item}
          navigation={navigation}></RandevularCard>
      );
    };
   function getUserData() {
     db.transaction(tx => {
       tx.executeSql(
         'SELECT * FROM users where id = ?',
         [userId],
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
    getUserData();
    userAppointments();
  }, []);
  console.log(myAppo);
 
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.profile}
          source={{
            uri: Images.profilePic,
          }}></Image>
      </View>
      <View style={styles.space}></View>
      <View>
        <Text style={styles.header_text}>{Strings.header}</Text>
      </View>
      <View style={styles.space3}></View>
      <InfoCard text={userData.name} imageUri={Images.profilePic}></InfoCard>
      <View style={styles.seperator} />
      <InfoCard text={userData.email} imageUri={Images.mailImage} />
      <View style={styles.seperator} />
      <InfoCard text={userData.phone} imageUri={Images.phoneImage}></InfoCard>
      <View style={styles.seperator} />
      <InfoCard
        text={userData.password}
        imageUri={Images.passwordImage}></InfoCard>
      <View style={styles.seperator} />
      <View style={{marginTop: 15}}>
        <Text style={styles.header_text}>{Strings.my_appointments}</Text>
      </View>
      {userData.name == null ? (
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => {
            getUserData();
          }}>
            <View
              style={{height: Dimensions.get('window').height * 0.1}}></View>

            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                marginHorizontal: 50,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Kullanıcı Yok Kullanıcı Eklemek İçin Admin Kısmına Gidin ya da
              Eklediyseniz Tıklayın
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={myAppo}
          renderItem={renderRandevularCard}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: w * 0.2,
    height: w * 0.2,
    alignSelf: 'center',
    marginTop: 50,
  },
  space: {height: h * 0.01},
  header_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  space3: {height: h * 0.03},
  seperator: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: w * 0.05,
  },
});


export default Second;
