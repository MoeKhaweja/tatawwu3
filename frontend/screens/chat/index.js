import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ChatRoomList from "./chatsList";

const FirstRoute = () => <ChatRoomList />;

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function ChatScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "My Rooms" },
    { key: "second", title: "Second" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            style={{ backgroundColor: "red" }}
            indicatorStyle={{ backgroundColor: "green" }} // Set tab bar background color
          />
        )}
      />
    </SafeAreaView>
  );
}
