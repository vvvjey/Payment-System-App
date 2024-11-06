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
import DepositWithdrawScreen from "../../screens/DepositWithdrawScreen";


import QRCodeScreen from "../../screens/QRCodeScreen";
import CameraHandleQRCode from '../../screens/CameraHandleQRCode';
import WebviewZaloPayScreen from "../../screens/WebviewZaloPay";
import { Colors } from "../../../assets/colors";
import { fontScale } from "../../utils/spacing";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainStack = () => (

  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={MainTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
    <Stack.Screen name="CameraHandleQRCode" component={CameraHandleQRCode} />
    <Stack.Screen name="WebviewZaloPayScreen" component={WebviewZaloPayScreen} options={{headerShown:false}}/>

    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DepositWithdraw"
      component={DepositWithdrawScreen}
      options={{
        title: 'Nạp/Rút',
        headerStyle: {
          backgroundColor: Colors.LightBlue,
        },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: fontScale(24),
          fontWeight: "600"
        },
      }}
    />
  </Stack.Navigator>
);

const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        key="Home"
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        key="Promotion"
        name="Promotion"
        component={PromotionScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        key="CameraHandleQRCodeTab"
        name="CameraHandleQRCodeTab"
        component={CameraHandleQRCode}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        key="History"
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        key="Profile"
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen key="Login" name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Tab.Screen key="Register" name="Register" component={RegisterScreen} options={{ headerShown: false }}/> */}
    </Tab.Navigator>
  );
};

export default MainStack;
