import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../../constants";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyTabBar } from "../../components/MyTabBar";
import PromotionScreen from "../../screens/PromotionScreen";
import HistoryScreen from "../../screens/HistoryScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import RegisterScreen from "../../screens/RegisterScreen";

import QRCodeScreen from "../../screens/QRCodeScreen";
import CameraHandleQRCode from '../../screens/CameraHandleQRCode';
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


const MainStack = () => (
  <Stack.Navigator >
      <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown:false}}/>
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
      <Stack.Screen name="CameraHandleQRCode" component={CameraHandleQRCode} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>

  </Stack.Navigator>
);

const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen key="Home" name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen key="Promotion" name="Promotion" component={PromotionScreen} options={{ headerShown: false }}/>
      <Tab.Screen key="CameraHandleQRCodeTab" name="CameraHandleQRCodeTab" component={CameraHandleQRCode} options={{ headerShown: false }}/>
      <Tab.Screen key="History" name="History" component={HistoryScreen} options={{ headerShown: false }}/>
      <Tab.Screen key="Profile" name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      {/* <Tab.Screen key="Login" name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Tab.Screen key="Register" name="Register" component={RegisterScreen} options={{ headerShown: false }}/> */}

    </Tab.Navigator>
  );
};

export default MainStack;
