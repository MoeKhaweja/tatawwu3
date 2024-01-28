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
import ViewCommunityEvents from "../screens/communityEvents";
import CommunityEventDetails from "../screens/communityEventDetails";
import VolunteerEventDetails from "../screens/volunteerEventDetails";
import CommunityAddEvents from "../screens/communityEventsAdd";
import CommunityEditEvent from "../screens/communityEventEdit";
import ProfilePage from "../screens/profile";
import CommunityProfilePage from "../screens/communityProfile";
import { EventList } from "../screens/userEvents";
import HomeCommunityScreen from "../screens/homeCommunity";

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
        <Stack.Screen
          name='HomeCommunityScreen'
          options={{ headerShown: false }}
          component={HomeCommunityScreen}
        />
        <Stack.Screen
          name='EventList'
          component={EventList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CommunityProfilePage'
          component={CommunityProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProfilePage'
          component={ProfilePage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='CommunityEventDetails'
          component={CommunityEventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CommunityAddEvents'
          component={CommunityAddEvents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CommunityEditEvent'
          component={CommunityEditEvent}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='RoomDetails'
          component={RoomDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='VolunteerEventDetails'
          component={VolunteerEventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CompleteProfilePage'
          component={CompleteProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ChatsScreen'
          options={{ headerShown: false }}
          component={ChatsScreen}
        />
        <Stack.Screen
          name='CreateRoom'
          component={CreateRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CreateCommunityScreen'
          component={CreateCommunityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ChatScreen'
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ViewCommunityEvents'
          component={ViewCommunityEvents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signin'
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Reset'
          component={ResetPassword}
          options={{ headerShown: false }}
        />
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
