import React, { useEffect, useState } from "react";
import { Appbar, BottomNavigation, Button, Text } from "react-native-paper";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";

import Feed from "../../tabs/volunteer";

import Communities from "../../tabs/communities";
import ChatScreen from "../chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProfilePage from "../profile";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../../theme";
import ViewCommunityEvents from "../communityEvents";
import Volunteers from "../../tabs/volunteers/volunteers";
import { verifyToken } from "../../store/user";

const ChatsRoute = () => <ChatScreen></ChatScreen>;
const ProfileRoute = () => <ProfilePage></ProfilePage>;

const HomeCommunityScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(verifyToken());
    } catch (e) {}
  }, []);

  const [index, setIndex] = useState(0);

  const [communityRoutes] = useState([
    {
      key: "events",
      title: "My Events",
      focusedIcon: "hands-helping",
      unfocusedIcon: "hands-helping",
    },
    {
      key: "volunteers",
      title: "Volunteers",
      focusedIcon: "users",
      unfocusedIcon: "users",
    },
    {
      key: "chats",
      title: "Chats",
      focusedIcon: "chat",
      unfocusedIcon: "chat",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "person",
      unfocusedIcon: "person",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    chats: ChatsRoute,
    profile: ProfileRoute,
    events: ViewCommunityEvents,
    volunteers: Volunteers,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BottomNavigation
          barStyle={{ backgroundColor: theme.colors.primary }}
          inactiveColor='white'
          activeColor='white'
          renderIcon={({ route, focused, color }) => {
            if (route.key == "chats") {
              return (
                <Icon2
                  name={focused ? route.focusedIcon : route.unfocusedIcon}
                  size={20}
                  color={color}
                />
              );
            }
            if (route.key == "profile") {
              return (
                <Icon3
                  name={focused ? route.focusedIcon : route.unfocusedIcon}
                  size={20}
                  color={color}
                />
              );
            }
            return (
              <Icon
                name={focused ? route.focusedIcon : route.unfocusedIcon}
                size={20}
                color={color}
              />
            );
          }}
          navigationState={{
            index,
            routes: communityRoutes,
          }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeCommunityScreen;
