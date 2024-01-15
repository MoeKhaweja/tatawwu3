import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ScrollView, Image, View } from "react-native";
import { Card, Avatar, Text, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities } from "../../store/user";

const DemoData = [
  {
    id: "1",
    name: "Card Title 1",
    description: "Description for Card 1",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "rocket",
  },
  {
    id: "2",
    name: "Card Title 2",
    description: "Description for Card 2",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "star",
  },
  {
    id: "3",
    name: "Card Title 1",
    description: "Description for Card 1",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "rocket",
  },
  {
    id: "4",
    name: "Card Title 2",
    description: "Description for Card 2",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "star",
  },
  // Add more demo data as needed
];

const Communities = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.user.communities);
  const events = useSelector((state) => state.user.volunteerEvents);

  useFocusEffect(
    useCallback(() => {
      try {
        dispatch(getCommunities());
      } catch {}
    }, [])
  );

  const filteredEvents = (events, community) =>
    events.filter((event) => event.community === community._id);

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const renderCards = (items) => {
    return items.map((item) => (
      <Card
        key={item._id}
        style={{ marginVertical: 5, marginHorizontal: 2, overflow: "hidden" }}
        onPress={() => {
          navigation.navigate("CommunityProfilePage");
          console.log(filteredEvents(events, item));
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <Card.Content
              style={{
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Avatar.Image size={40} source={{ uri: item.img }} />
                </View>

                <View
                  tyle={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text variant='titleMedium'>{item.name}</Text>
                </View>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <Searchbar
        style={{ marginBottom: 10 }}
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <ScrollView>
        <Text variant='titleSmall'>All Communities</Text>
        {renderCards(communities)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Communities;
