import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../../theme";
import ViewCommunityEvents from "../communityEvents";

const VolunteerRoute = () => <Feed></Feed>;
const CommunitiesRoute = () => <Communities></Communities>;
const ChatsRoute = () => <ChatScreen></ChatScreen>;
const ProfileRoute = () => <ProfilePage></ProfilePage>;

const FeedItem = ({ content }) => {
  return (
    <View style={{ margin: 10 }}>
      <Text>{content}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const user = useSelector((state) => state.user.user.user);
  const [routes] = useState([
    {
      key: "volunteer",
      title: "Volunteer",
      focusedIcon: "hands-helping",
      unfocusedIcon: "hands-helping",
    },
    {
      key: "communities",
      title: "Communities",
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
  const [communityRoutes] = useState([
    {
      key: "events",
      title: "My Events",
      focusedIcon: "hands-helping",
      unfocusedIcon: "hands-helping",
    },
    {
      key: "communities",
      title: "Communities",
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
    volunteer: VolunteerRoute,
    communities: CommunitiesRoute,
    chats: ChatsRoute,
    profile: ProfileRoute,
    events: ViewCommunityEvents,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [feedData] = useState([
    "Demo Content 1",
    "Demo Content 2",
    "Demo Content 3",
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const renderFeedItems = () => {
    return feedData.map((item, index) => (
      <FeedItem key={index} content={item} />
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      {user?.role == "volunteer" && (
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
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      )}
      {user?.role == "community" && (
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
          navigationState={{ index, routes: communityRoutes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      )}
    </View>
  );
};

export default HomeScreen;
