import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignupScreen from "../screens/signUp";
import SigninScreen from "../screens/signIn";
import SplashScreen from "../screens/splash";
import ResetPassword from "../screens/resetPassword";
import Verify from "../screens/verify";
import HomeScreen from "../screens/home";
import CreateRoom from "../screens/createRoom";
import ChatScreen from "../screens/chat";
import RoomDetails from "../screens/roomDetails";
import CompleteProfilePage from "../screens/completeProfile";
import ChatsScreen from "../screens/chat/chats";
import CreateCommunityScreen from "../screens/createCommunity";

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
        <Stack.Screen
          name='Home'
          options={{ headerShown: false }}
          component={HomeScreen}
        />

        <Stack.Screen name='RoomDetails' component={RoomDetails} />
        <Stack.Screen
          name='CompleteProfilePage'
          component={CompleteProfilePage}
        />
        <Stack.Screen
          name='ChatsScreen'
          options={{ headerShown: false }}
          component={ChatsScreen}
        />
        <Stack.Screen name='CreateRoom' component={CreateRoom} />
        <Stack.Screen
          name='CreateCommunityScreen'
          component={CreateCommunityScreen}
        />
        <Stack.Screen name='ChatScreen' component={ChatScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='Signin' component={SigninScreen} />
        <Stack.Screen name='Reset' component={ResetPassword} />
        <Stack.Screen
          name='Verify'
          options={{ headerShown: false }}
          component={Verify}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
