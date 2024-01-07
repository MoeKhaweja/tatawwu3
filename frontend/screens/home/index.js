import React, { useState } from "react";
import { Appbar, BottomNavigation, Text } from "react-native-paper";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Feed from "../../tabs/volunteer";
import { SafeAreaView } from "react-native-safe-area-context";
import Communities from "../../tabs/communities";
import ChatScreen from "../chat";

const VolunteerRoute = () => <Feed></Feed>;
const CommunitiesRoute = () => <Communities></Communities>;
const ChatsRoute = () => <ChatScreen></ChatScreen>;
const NotificationsRoute = () => <Text>Notifications</Text>;

const FeedItem = ({ content }) => {
  return (
    <View style={{ margin: 10 }}>
      <Text>{content}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: "volunteer",
      title: "Volunteer",
      icon: "home",
    },
    { key: "communities", title: "Communities", icon: "album" },
    { key: "chats", title: "Chats", icon: "history" },
    { key: "notifications", title: "Notifications", icon: "bell" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    volunteer: VolunteerRoute,
    communities: CommunitiesRoute,
    chats: ChatsRoute,
    notifications: NotificationsRoute,
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
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  );
};

export default HomeScreen;
