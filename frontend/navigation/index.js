import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignupScreen from "../screens/signUp";
import SigninScreen from "../screens/signIn";
import SplashScreen from "../screens/splash";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          options={{ headerShown: false }}
          component={SplashScreen}
        />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='Signin' component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
