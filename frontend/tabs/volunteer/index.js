import React, { useState, useEffect } from "react";
import { ScrollView, Image, View } from "react-native";
import {
  Card,
  Avatar,
  Text,
  Searchbar,
  Title,
  Paragraph,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  findEventsByApplicant,
  getAllEvents,
  getMatchingEvents,
} from "../../store/user";
import { useNavigation } from "@react-navigation/native";
import LoadingOrError from "../../components/loadingOrError";

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

  const InstagramPost = (post) => {
    return (
      <Card
        style={{
          margin: 3,
          marginVertical: 10,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Card.Title
          title={post.title}
          left={(props) => (
            <Avatar.Image {...props} source={{ uri: post.img }} />
          )}
          titleStyle={{ color: "#000", fontWeight: "bold" }}
          subtitle={
            <Paragraph style={{ color: "#000" }}>
              {post.schedule.date}
            </Paragraph>
          }
          rightStyle={{ paddingRight: 15 }}
          // right={() => (
          //   <Paragraph style={{ color: "#000" }}>
          //     {post.schedule.date}
          //   </Paragraph>
          // )}
        />
        <Card.Content></Card.Content>
        <Card.Cover
          src={`http://192.168.1.5:8000/images/${post.img}`}
          source={{ uri: post.image }}
        />
      </Card>
    );
  };

  const renderCards = (items, title) => {
    return (
      <View>
        <Text variant='titleSmall'>{title} </Text>
        <LoadingOrError></LoadingOrError>
        {items.map(
          (item, index) => InstagramPost(item)
          // <Card
          //   key={index}
          //   style={{
          //     marginVertical: 5,
          //     marginHorizontal: 2,
          //     overflow: "hidden",
          //   }}
          //   onPress={() => {
          //     navigation.navigate("VolunteerEventDetails", { event: item });
          //     console.log(eventsApplicationStatus);
          //   }}
          // >
          //   <View style={{ flexDirection: "row" }} key={item.id}>
          //     <View>
          //       <Card.Content
          //         style={{
          //           padding: 10,
          //         }}
          //       >
          //         <View
          //           style={{
          //             flexDirection: "row",
          //             gap: 15,
          //             justifyContent: "flex-start",
          //           }}
          //         >
          //           <View
          //             style={{
          //               flexDirection: "column",
          //               justifyContent: "center",
          //             }}
          //           >
          //             <Avatar.Image size={40} source={{ uri: item.avatar }} />
          //           </View>

          //           <View
          //             tyle={{
          //               flexDirection: "column",
          //               justifyContent: "center",
          //             }}
          //           >
          //             <Text
          //               numberOfLines={2}
          //               ellipsizeMode='middle'
          //               variant='titleMedium'
          //             >
          //               {item.title}{" "}
          //             </Text>
          //             <Text numberOfLines={3} variant='bodySmall'>
          //               {item.description}
          //             </Text>
          //           </View>
          //         </View>
          //       </Card.Content>
          //     </View>
          //     <View style={{ minWidth: 80, flexDirection: "column" }}>
          //       <Image
          //         style={{ flex: 1 }}
          //         source={{ uri: item.image }}
          //         resizeMode='cover'
          //       />
          //     </View>
          //   </View>
          // </Card>
        )}
      </View>
    );
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
        {renderCards(data2, "Events based on your preference ")}

        {renderCards(data, "All Events")}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
