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
      initialRouteName={'LoginScreen'}
    >
      <Stack.Screen
        // name={SCREENS.LOGIN}
        name={'LoginScreen'}

        component={LoginScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={'RegisterScreen'}
        component={RegisterScreen}
        options={{ headerShown: true }}
      />

    </Stack.Navigator>
  );
};

export default AuthStack;
