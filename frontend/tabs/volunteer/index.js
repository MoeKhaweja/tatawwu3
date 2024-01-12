import React, { useState, useEffect } from "react";
import { ScrollView, Image, View } from "react-native";
import { Card, Avatar, Text, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/user";

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const pageSize = 10;
  const dispatch = useDispatch();
  const events = useSelector((state) => state.user.volunteerEvents);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await dispatch(getAllEvents());

      setData((prevData) => [...prevData, ...events?.paginatedEvents]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      !isLoading
    ) {
      fetchData();
    }
  };

  const renderCards = (items) => {
    return items.map((item, index) => (
      <Card
        key={index}
        style={{ marginVertical: 5, marginHorizontal: 2, overflow: "hidden" }}
      >
        <View style={{ flexDirection: "row" }} key={item.id}>
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
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />

      <ScrollView onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}>
        <Text variant='titleSmall'>For You</Text>
        {renderCards(data)}
        {isLoading && <Text>Loading...</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
