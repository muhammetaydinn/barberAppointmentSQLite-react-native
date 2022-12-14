import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InfoCard from '../../components/InfoCard.js/InfoCard';
import BarberRandevularCard from '../../components/BarberRandevular/BarberRandevular';
import {SiteContext, useContext} from '../../context/SiteContext';
import { Images } from '../../constants/Images';
import { Strings } from '../../constants/Strings';
import styles from './Fourth.style'

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
        <View>
          <TouchableOpacity
            color={'gray'}
            disabled={barberData.name == null}
            title={'Profili Düzenle'}
            onPress={() => {
              navigation.navigate('EditBarberProfile');
            }}
            style={styles.button_view}>
            <Text style={styles.button_text}>{Strings.edit_profile}</Text>
          </TouchableOpacity>
        </View>
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
