import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import First from './pages/First/First';
import Second from './pages/Second/Second';
import Third from './pages/Third/Third';
import Fourth from './pages/Fourth/Fourth';
import Fifth from './pages/Fifth/Fifth';
import EditProfile from './pages/EditProfile/EditProfile';
import EditBarberProfile from './pages/EditBarberProfile/EditBarberProfile';
import {SiteContext} from './context/SiteContext';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//const [data, setData] = useState([]);
//let [userData, setUserData] = useState({});
//some constants
//db yi belki ama belki
const db1 = SQLite.openDatabase(
  {
    location: 'default',
    name: 'SqliteDb',
  },
  () => {},
  err => {
    console.log('hata');
  },
);
const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="First"
        component={First}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Second"
        component={Second}
        options={{headerTitle: '', headerTransparent: true}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerTitle: '', headerTransparent: true}}
      />
      <Stack.Screen
        name="Third"
        component={Third}
        options={{headerTitle: '', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};
const BarberStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Fourth"
        component={Fourth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBarberProfile"
        component={EditBarberProfile}
        options={{headerTitle: '', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

function Router() {
  const [allBarbers, setAllBarbers] = useState({});
  const [db, setDb] = useState(db1);
  const [myAppo, setMyAppo] = useState({});
  const [barberAppo, setBarberAppo] = useState({});
  const [list2, setList2] = useState({});
  const wholeBarbers = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM barbers', [], (tx, result) => {
        var temp = [];
        for (let index = 0; index < result.rows.length; index++) {
          temp.push(result.rows.item(index));
        }
        setAllBarbers(temp);
        setList2(temp);
      });
    });
  };
  const myBarberAppointments = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM appointments where barberId = ?',
        [1],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var temp = [];
            for (let index = 0; index < len; index++) {
              temp.push(results.rows.item(index));
            }
            setBarberAppo(temp);
          } else {
            setBarberAppo(temp);
          }
        },
      );
    });
  };
  const userAppointments = () => {
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
  function createTables(){
    return new Promise((resolve, reject) => {
      createBarbersTable();
      createUsersTable();
      createTimeTable();
      createAppointmentsTable();
      resolve(true);
    });
  }
  function createBarbersTable(){
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS barbers (id INTEGER PRIMARY KEY AUTOINCREMENT , email TEXT,name TEXT, address TEXT , gender INTEGER , phone TEXT , today INTEGER , tomorrow INTEGER , nextDay INTEGER )',
        [],
        (tx, result) => {
          console.log('createBarbersTabletx', tx);
          console.log('createBarbersTableresult', result);
        },
      );
    });
  }
    function createUsersTable() {
    console.log('createUsersTable');
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT , email TEXT, name TEXT , phone TEXT ,password TEXT )',
        [],
        (tx, result) => {
          console.log('createUsersTabletx', tx);
          console.log('createUsersTableresult', result);
        },
      );
    });
  }
   async function createTimeTable() {
     db.transaction(tx => {
       tx.executeSql(
         'CREATE TABLE IF NOT EXISTS dateTime (id INTEGER UNIQUE, date TEXT , degisken TEXT)',
         [],
         async (tx, result) => {
           if (result.rowsAffected > 0) {
             return Promise.resolve('success');
           } else {
             return Promise.resolve('successButNotCreated');
           }
         },
       );
     });
   }
  function createAppointmentsTable() {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT , barberId INTEGER , userId INTEGER ,  address TEXT , date TEXT)',
        [],
        (tx, result) => {
          console.log('createAppointmentsTabletx', tx);
          console.log('createAppointmentsTableresult', result);
        },
      );
    });
  }
  async function insertFirstDate() {
    var todayy = new Date();
    const today = todayy.toISOString().split('T')[0];
    db.transaction(tx => {
      tx.executeSql(
        'INSERT or IGNORE INTO  dateTime (id,date,degisken) VALUES(?,?,?)',
        [1, today, todayy.toString()],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            return Promise.resolve('success');
          } else {
            return Promise.resolve('successButNotInserted');
          }
        },
      );
    });
  }
  // async function getDate() {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'SELECT * FROM dateTime where id=?',
  //       [1],
  //       async (tx, results) => {
  //         var len = results.rows.length;
  //         if (len > 0) {
  //           const a = results.rows.item(0).date; //There will be an async function for setting like that
  //           return Promise.resolve(a);
  //         } else {
  //           return Promise.resolve('error');
  //         }
  //       },
  //     );
  //   });
  // }
  
  function getDateString() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM dateTime where id=?',
          [1],
          async (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              const a = results.rows.item(0).date; //There will be an async function for setting like that
              return resolve(a);
            } else {
              return reject('selan');
            }
          },
        );
      });
    });
  }
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
  async function dateCheckAndReplaceBools(date) {
    return new Promise((resolve, reject) => {
      var todayy = new Date();
      const today = todayy.toISOString().split('T')[0];

      console.log('-------DATE:' + date);
      const checkToday = diffInToday(date);
      var value =
        checkToday >= 0
          ? checkToday == 0
            ? ''
            : checkToday == 1
            ? 'UPDATE barbers set today=tomorrow , tomorrow=nextDay , nextDay=?'
            : checkToday == 2
            ? 'UPDATE barbers set today=nextDay , tomorrow=? , nextDay=? '
            : 'UPDATE barbers set today=? , tomorrow=? , nextDay=? '
          : '';

      var dizi =
        checkToday >= 0
          ? checkToday == 0
            ? []
            : checkToday == 1
            ? [0]
            : checkToday == 2
            ? [0, 0]
            : [0, 0, 0]
          : [];

      console.log(
        '------------------------------checkToday:[' + checkToday + ']',
      );
      console.log('---------------------' + value);
      db.transaction(tx => {
        tx.executeSql(value, dizi, (tx, results) => {
          if (results.rowsAffected > 0) {
            return resolve('Update Success');
            //  setDate(results.rows.item(0).date);
            //  console.log('User updated successfully');
            //  wholeBarbers();
            //  myBarberAppointments();
          } else resolve('Nothing to update');
        });
      });
    });
  }
  function updateDate() {
    return new Promise((resolve, reject) => {
      var todayy = new Date();
      const today = todayy.toISOString().split('T')[0];
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE dateTime set date=? , degisken=? where id=?',
          [today, todayy.toString(), 1],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              return resolve('Update Success');
              //  setDate(results.rows.item(0).date);
              //  console.log('User updated successfully');
              //  wholeBarbers();
              //  myBarberAppointments();
            } else reject('Update Failed');
          },
        );
      });
    });
  }


  useEffect(() => {
    createTables().then(() => {
      insertFirstDate().then(() => {
        getDateString().then((val) => {
          dateCheckAndReplaceBools(val).then(() => {
            updateDate().then(()=>
            {
              wholeBarbers();
              myBarberAppointments();
            })

            
          });
          
        })
        
      })

      
    });
    // getDateString().then(val => {
    //   console.log(val);
    //   console.log('selamlar');
    //   console.log(diffInToday(val));
    //   dateCheckAndReplaceBools(val).then(() => {
    //     wholeBarbers();
    //     myBarberAppointments();
    //   });
    // });
    
  }, []);

  const data = {
    allBarbers,
    setAllBarbers,
    db,
    myAppo,
    setMyAppo,
    barberAppo,
    setBarberAppo,
    list2,
    setList2,
    wholeBarbers,
    myBarberAppointments,
    userAppointments,
  };

  return (
    <SiteContext.Provider value={data}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelPosition: 'beside-icon',
            tabBarLabelStyle: {
              fontWeight: '700',
              fontSize: 15,
            },
            tabBarIconStyle: {display: 'none'},
            tabBarActiveTintColor: '#000',
          }}>
          <Tab.Screen
            name="Customer"
            component={CustomerStack}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Barber"
            component={BarberStack}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Admin"
            component={Fifth}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SiteContext.Provider>
  );
}

export default Router;
