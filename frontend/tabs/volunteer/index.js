import React, { useState, useEffect } from "react";
import { ScrollView, Image, View } from "react-native";
import { Card, Avatar, Text, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const pageSize = 10;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch data from your API or other data source
      // // You can use the 'page' variable to implement pagination
      // const response = await fetch(`http://your-api-endpoint/all-community-events?page=${page}`);
      // const newData = await response.json();

      // setData((prevData) => [...prevData, ...newData.events]);
      // setPage((prevPage) => prevPage + 1);
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
    return items.map((item) => (
      <Card
        key={item.id}
        style={{ marginVertical: 5, marginHorizontal: 2, overflow: "hidden" }}
      >
        {/* Your existing card content */}
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
