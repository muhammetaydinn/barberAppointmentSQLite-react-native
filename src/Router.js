import React from 'react';
import {useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import First from './pages/First';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourh';
import Fifth from './pages/Fifth';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//const [data, setData] = useState([]);
//let [userData, setUserData] = useState({});
//some constants
//db yi belki ama belki
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
        name="Third"
        component={Third}
        options={{headerTitle: '', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};
function Router() {


  return (
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
          component={Fourth}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Admin"
          component={Fifth}
          options={{headerShown: false}}
        />
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default Router;
