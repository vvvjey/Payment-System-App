import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../../constants";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.MAIN}
    >
      <Stack.Screen
        name={SCREENS.MAIN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
