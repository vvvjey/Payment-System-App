import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SCREENS } from "../../constants";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import { QRCodeScreen } from "../../screens/QRCodeScreen";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.LOGIN}
    >
      <Stack.Screen
        name={SCREENS.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.REGISTER}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default AuthStack;
