import React, { useState, useEffect } from "react";
import { ScrollView, Image, View } from "react-native";
import { Card, Avatar, Text, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  findEventsByApplicant,
  getAllEvents,
  getMatchingEvents,
} from "../../store/user";
import { useNavigation } from "@react-navigation/native";

const Feed = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const pageSize = 10;
  const dispatch = useDispatch();
  const events = useSelector((state) => state.user.volunteerEvents);
  const eventsApplicationStatus = useSelector(
    (state) => state.user.eventsApplicationStatus
  );

  const volunteerMatchingEvents = useSelector(
    (state) => state.user.volunteerMatchingEvents
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        // Make sure getAllEvents dispatches an action that updates the state with events data
        await dispatch(getMatchingEvents());
        await dispatch(getAllEvents());
        setPage((prevPage) => prevPage + 1);

        dispatch(findEventsByApplicant());
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetch();
  }, []); // Fetch data when the component mounts

  useEffect(() => {
    if (events) {
      setData((prevData) => [...prevData, ...events]);
    } else {
      console.log("Events or paginatedEvents is undefined");
    }
  }, [JSON.stringify(events)]);

  useEffect(() => {
    if (volunteerMatchingEvents) {
      setData2((prevData) => [...prevData, ...volunteerMatchingEvents]);
    } else {
      console.log("Events or volunteerMatchingEvents is undefined");
    }
  }, [JSON.stringify(volunteerMatchingEvents)]);

  // const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
  //   const paddingToBottom = 20;
  //   if (
  //     layoutMeasurement.height + contentOffset.y >=
  //       contentSize.height - paddingToBottom &&
  //     !isLoading
  //   ) {
  //     // fetchData();
  //   }
  // };

  const renderCards = (items) => {
    return items.map((item, index) => (
      <Card
        key={index}
        style={{ marginVertical: 5, marginHorizontal: 2, overflow: "hidden" }}
        onPress={() => {
          navigation.navigate("VolunteerEventDetails", { event: item });
          console.log(eventsApplicationStatus);
        }}
      >
        <View style={{ flexDirection: "row" }} key={item.id}>
          <View>
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
                  <Text
                    numberOfLines={2}
                    ellipsizeMode='middle'
                    variant='titleMedium'
                  >
                    {item.title}{" "}
                  </Text>
                  <Text numberOfLines={3} variant='bodySmall'>
                    {item.description}
                  </Text>
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
      {/* onScroll={({ nativeEvent }) => handleScroll(nativeEvent)} */}
      <ScrollView>
        <Text variant='titleSmall'>Events based on your preference </Text>
        {renderCards(data2)}
        <Text variant='titleSmall'>All events </Text>
        {renderCards(data)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
