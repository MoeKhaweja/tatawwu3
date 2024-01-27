import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Image, View, Animated } from "react-native";
import {
  Card,
  Avatar,
  Text,
  Searchbar,
  Title,
  Paragraph,
  Chip,
  Button,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  findEventsByApplicant,
  getAllEvents,
  getMatchingEvents,
  getQueryEvents,
} from "../../store/user";
import { useNavigation } from "@react-navigation/native";
import LoadingOrError from "../../components/loadingOrError";
import theme from "../../theme";
import { BASE_IMG_URL } from "../../helpers/image";
import TopAppBar from "../../components/appBar";

const Feed = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedChip, setSelectedChip] = useState("All Events");
  const [displayLoad, setDisplayLoad] = useState(true);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.user.volunteerEvents);
  const queryEvents = useSelector((state) => state.user.searchEvents);
  const eventsApplicationStatus = useSelector(
    (state) => state.user.eventsApplicationStatus
  );

  const volunteerMatchingEvents = useSelector(
    (state) => state.user.volunteerMatchingEvents
  );
  const animatedController = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        // Make sure getAllEvents dispatches an action that updates the state with events data
        const page = Math.ceil(data.length / 2) + 1;
        await dispatch(getMatchingEvents());
        await dispatch(getAllEvents({ page: page }));
        setPage((prevPage) => prevPage + 1);

        dispatch(findEventsByApplicant());
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetch();
  }, []); // Fetch data when the component mounts

  useEffect(() => {
    if (
      events &&
      data[data.length - 1]?._id != events[events.length - 1]?._id
    ) {
      setData((prevData) => [...prevData, ...events]);
    } else {
      console.log("Events or paginatedEvents is undefined");
    }
  }, [events[0]?._id]);

  useEffect(() => {
    if (volunteerMatchingEvents) {
      setData2((prevData) => [...prevData, ...volunteerMatchingEvents]);
    } else {
      console.log("Events or volunteerMatchingEvents is undefined");
    }
  }, [volunteerMatchingEvents.length]);

  useEffect(() => {
    // This function will be called after a 2-second delay

    if (searchQuery) {
      const delayedSearch = () => {
        console.log("Perform search with query:", searchQuery);
        try {
          dispatch(getQueryEvents({ query: searchQuery }));
        } catch {}
        // Perform your search or any other action here
      };

      // Set a timer for 2 seconds
      const timerId = setTimeout(delayedSearch, 1000);

      // Clear the timer if a new letter is entered before the 2 seconds elapse
      return () => clearTimeout(timerId);
    }
  }, [searchQuery]); // Execute the effect w

  const InstagramPost = (post, index) => {
    return (
      <Card
        key={index}
        style={{
          margin: 3,
          marginVertical: 10,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 5,
          overflow: "hidden",
        }}
        onPress={() => {
          navigation.navigate("VolunteerEventDetails", { event: post });
          console.log(eventsApplicationStatus);
        }}
      >
        <Card.Title
          title={post.title}
          left={(props) => (
            <Avatar.Image
              {...props}
              source={{
                uri: `${BASE_IMG_URL}${post.community.img}`,
              }}
            />
          )}
          titleStyle={{ color: "#000", fontWeight: "bold" }}
          subtitle={
            <Paragraph style={{ color: "#888" }}>
              {post.schedule.date}
            </Paragraph>
          }
          rightStyle={{ paddingRight: 15 }}
        />
        <Card.Content></Card.Content>
        <Card.Cover
          src={`${BASE_IMG_URL}${post.img}`}
          source={{ uri: post.image }}
          style={{ borderRadius: 0 }}
        />
      </Card>
    );
  };

  const renderCards = (items, Recommended = false) => {
    return (
      <View>
        {items.map((item, index) => InstagramPost(item, index))}
        {!searchQuery && displayLoad && !Recommended && (
          <Button onPress={loadMoreEvents} mode='text'>
            Load More
          </Button>
        )}

        <LoadingOrError></LoadingOrError>
      </View>
    );
  };
  const loadMoreEvents = async () => {
    setIsLoading(true);

    try {
      const page = Math.ceil(data.length / 2) + 1;
      console.log(page);
      const x = await dispatch(getAllEvents({ page: page }));
      console.log(x.payload.length === 0);
      if (x.payload.length === 0) {
        setDisplayLoad(false);
      }
    } catch (error) {
      console.error("Error loading more events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animatedController, {
      toValue: isExpanded ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const searchBarWidth = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["10%", "100%"], // change outputRange values as per your needs
  });

  return (
    <>
      <TopAppBar></TopAppBar>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Animated.View style={{ width: searchBarWidth }}>
              {isExpanded ? (
                <Searchbar
                  style={{ marginTop: 10 }}
                  placeholder='Search'
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  icon='arrow-left'
                  onIconPress={handlePress}
                />
              ) : (
                <IconButton
                  icon='magnify'
                  onPress={handlePress}
                  style={{ paddingRight: 20 }}
                />
              )}
            </Animated.View>
            {!isExpanded && (
              <Chip
                mode='outlined'
                selected={selectedChip === "All Events"}
                onPress={() => setSelectedChip("All Events")}
                style={{
                  backgroundColor:
                    selectedChip === "All Events"
                      ? theme.colors.secondary
                      : theme.colors.tertiary, // Change background color for the active chip
                  // Change text color for the active chip
                }}
                selectedColor='white'
                textStyle={{ color: "white" }}
              >
                All Events
              </Chip>
            )}
            {!isExpanded && (
              <Chip
                mode='outlined'
                selected={selectedChip === "Recommended"}
                onPress={() => setSelectedChip("Recommended")}
                style={{
                  backgroundColor:
                    selectedChip === "Recommended"
                      ? theme.colors.secondary
                      : theme.colors.tertiary, // Change background color for the active chip
                  // Change text color for the active chip
                }}
                selectedColor='white'
                textStyle={{ color: "white" }}
              >
                Recommended
              </Chip>
            )}
          </View>
          {queryEvents &&
            searchQuery &&
            renderCards(queryEvents, "Search Results")}

          {selectedChip === "All Events" && !searchQuery && renderCards(data)}
          {selectedChip === "Recommended" &&
            !searchQuery &&
            renderCards(data2, true)}
        </ScrollView>
      </View>
    </>
  );
};

export default Feed;
