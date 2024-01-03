import React from "react";
import { ScrollView, Image, View } from "react-native";
import { Card, Avatar, Text, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const DemoData = [
  {
    id: "1",
    title: "Card Title 1",
    description: "Description for Card 1",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "rocket",
  },
  {
    id: "2",
    title: "Card Title 2",
    description: "Description for Card 2",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "star",
  },
  {
    id: "3",
    title: "Card Title 1",
    description: "Description for Card 1",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "rocket",
  },
  {
    id: "4",
    title: "Card Title 2",
    description: "Description for Card 2",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar image URL
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    icon: "star",
  },
  // Add more demo data as needed
];

const Feed = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const renderCards = (items) => {
    return items.map((item) => (
      <Card
        key={item.id}
        style={{ marginVertical: 5, marginHorizontal: 2, overflow: "hidden" }}
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
                  <Avatar.Image size={40} source={{ uri: item.avatar }} />
                </View>

                <View
                  tyle={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text variant='titleMedium'>{item.title}</Text>
                  <Text variant='bodySmall'>{item.description}</Text>
                </View>
              </View>
            </Card.Content>
          </View>
          <View style={{ minWidth: 80, flexDirection: "column" }}>
            <Image
              style={{ flex: 1 }}
              source={{ uri: item.image }}
              resizeMode='cover'
            />
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
        <Text variant='titleSmall'>For You</Text>
        {renderCards(DemoData)}
        <Text variant='titleSmall'>For You</Text>
        {renderCards(DemoData)}
        <Text variant='titleSmall'>For You</Text>
        {renderCards(DemoData)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
