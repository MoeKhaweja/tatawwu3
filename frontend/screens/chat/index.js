import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ChatRoomList from "./chatsList";
import AllRooms from "./allRooms";

import { useTheme } from "react-native-paper";

const FirstRoute = () => <ChatRoomList />;

const SecondRoute = () => <AllRooms></AllRooms>;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function ChatScreen() {
  const theme = useTheme();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "My Rooms" },
    { key: "second", title: "Discover" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarProps={{
          labelStyle: {
            textTransform: "lowercase", // Convert titles to lowercase
          },
          indicatorStyle: { backgroundColor: "blue" }, // Example indicator style
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route, focused, color }) => (
              <Text style={{ color, margin: 8 }}>
                {route.title.toLowerCase()}
              </Text>
            )}
            style={{ backgroundColor: theme.colors.primary }}
            indicatorStyle={{ backgroundColor: theme.colors.tertiary }} // Set tab bar background color
          />
        )}
      />
    </SafeAreaView>
  );
}
