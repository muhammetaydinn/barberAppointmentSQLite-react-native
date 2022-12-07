import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard.js/InfoCard';
import BarberRandevularCard from '../components/BarberRandevular/BarberRandevular';
import {SiteContext, useContext} from '../context/SiteContext';
import { Images } from '../constants/Images';
import { Strings } from '../constants/Strings';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Fourth({ navigation }) {
   const {
     db,
     barberAppo,
     myBarberAppointments,
   } = useContext(SiteContext);
  const renderBarberRandevularCard = ({item}) => {
    return (
      <BarberRandevularCard item={item} navigation={navigation}></BarberRandevularCard>
    );
  };

  useEffect(() => {
    getBarberData();
    myBarberAppointments();
    
  },[])

  const [currentBarberId, setCurrentBarberId] = useState(1);
  const [barberData, setBarberData] = useState({});
  


  // Bizim berberin bilgilerini getiriyor useEffect ile lazım
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

  //Bizim berberin randevularını  randevular tablosundan getiriyor


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <ImageBackground
            style={styles.images_bg}
            source={{
              uri: barberData.gender
                ? Images.manBarberImage
                : Images.womenBarberImage,
            }}></ImageBackground>
        </View>
        <View style={styles.view1}></View>
        <View>
          <Text style={styles.text1}>{Strings.my_barber_info}</Text>
        </View>
        <InfoCard
          text={barberData.name}
          imageUri={Images.profilePic}></InfoCard>
        <View style={styles.view3} />
        <InfoCard
          text={barberData.email}
          imageUri={Images.mailImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard
          text={barberData.phone}
          imageUri={Images.phoneImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard
          text={barberData.address}
          imageUri={Images.addressImage}></InfoCard>
        <View style={styles.view3} />
        <InfoCard
          text={Strings.password_hidden}
          imageUri={Images.passwordImage}></InfoCard>
        <View style={styles.view3} />
        <View style={styles.view4}>
          <Text style={styles.text2}>{Strings.my_appointments}</Text>
        </View>
      </View>
      {barberData.today == null ? (
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={getBarberData}>
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
              Berber Yok Berber Eklemek İçin Admin Kısmına Gidin ya da
              Eklediyseniz Tıklayın
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={barberAppo}
          renderItem={renderBarberRandevularCard}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
