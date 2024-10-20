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

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen key="Home" name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen key="Promotion" name="Promotion" component={PromotionScreen} />
      <Tab.Screen key="History" name="History" component={HistoryScreen} />
      <Tab.Screen key="Profile" name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainStack;
