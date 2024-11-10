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
import ConfirmPaymentScreen from "../../screens/ConfirmPaymentScreen";
import PaymentSuccessScreen from "../../screens/PaymentSuccessScreen";
import { Ionicons } from "@expo/vector-icons";

import QRCodeScreen from "../../screens/QRCodeScreen";
import CameraHandleQRCode from "../../screens/CameraHandleQRCode";
import WebviewZaloPayScreen from "../../screens/WebviewZaloPay";
import { Colors } from "../../../assets/colors";
import { fontScale } from "../../utils/spacing";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { testApi } from "../../services/apiService";
import { ScreenNavigationProp } from "../../navigation/type";


const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="ProfileHome"
      component={ProfileScreen}
      options={{
        title: "Hồ sơ của tôi",
        headerStyle: {
          backgroundColor: Colors.White,
        },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: fontScale(24),
          fontWeight: "600",
        },
      }}
    />
  </ProfileStack.Navigator>
);

const QRCodeStack = createNativeStackNavigator();

const QRStackScreen = () => (
  <QRCodeStack.Navigator>
    <QRCodeStack.Screen
      name="CameraHandleQRCode"
      component={CameraHandleQRCode}
      options={{
        title: "Quét QR",
        headerStyle: {
          backgroundColor: Colors.LightBlue,
        },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: fontScale(20),
          fontWeight: "600",
        },
      }}
    />
  </QRCodeStack.Navigator>
);

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
    <Stack.Screen
      name="WebviewZaloPayScreen"
      component={WebviewZaloPayScreen}
      options={{ headerShown: false }}
    />

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
        title: "Nạp/Rút",
        headerStyle: {
          backgroundColor: Colors.LightBlue,
        },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: fontScale(24),
          fontWeight: "600",
        },
      }}
    />
    <Stack.Screen
      name="ConfirmPayment"
      component={ConfirmPaymentScreen}
      options={{
        title: "Thanh toán an toàn",
        headerStyle: {
          backgroundColor: Colors.LightBlue,
        },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: fontScale(24),
          fontWeight: "600",
        },
      }}
    />
    <Stack.Screen
      name="PaymentSuccess"
      component={PaymentSuccessScreen}
      options={({ navigation }) => ({
        title: "Kết quả giao dịch",
        headerStyle: {
          backgroundColor: Colors.LightBlue,
        },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: fontScale(24),
          fontWeight: "600",
        },
        headerBackVisible: false,
        headerRight: () => (
          <Ionicons
            name="home-outline"
            size={24}
            color="#000"
            style={{ marginLeft: 16 }}
            onPress={() => navigation.navigate("Home")}
          />
        ),
      })}
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
        key="CameraHandleQRCode"
        name="CameraHandleQRCode"
        component={QRStackScreen}
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
        component={ProfileStackScreen} 
        options={{ headerShown: false }} 
      />
      {/* <Tab.Screen key="Login" name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Tab.Screen key="Register" name="Register" component={RegisterScreen} options={{ headerShown: false }}/> */}
    </Tab.Navigator>
  );
};

export default MainStack;
