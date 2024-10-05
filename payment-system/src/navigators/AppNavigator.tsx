import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginContainer from '../containers/LoginContainer';
// import HomeContainer from '../containers/HomeContainer';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginContainer} />
        {/* <Stack.Screen name="Home" component={HomeContainer} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
