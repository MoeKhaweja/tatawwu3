import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Image, View } from "react-native";
import {
  Card,
  Avatar,
  Text,
  Searchbar,
  SegmentedButtons,
  Switch,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVolunteers,
  getCommunities,
  getQueryVolunteers,
  getVolunteers,
} from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";
import { BASE_IMG_URL } from "../../helpers/image";
import TopAppBar from "../../components/appBar";

const Volunteers = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const volunteers = useSelector((state) => state.user.volunteers);
  const queryResponse = useSelector((state) => state.user.searchVolunteers);

  useFocusEffect(
    useCallback(() => {
      try {
        dispatch(getVolunteers());
      } catch {}
    }, [])
  );

  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // This function will be called after a 2-second delay
    if (!searchQuery) {
      dispatch(clearVolunteers());
    }

    if (searchQuery && isSwitchOn) {
      const delayedSearch = () => {
        console.log("Perform search with query:", searchQuery);
        try {
          dispatch(getQueryVolunteers({ query: searchQuery }));
        } catch {}
        // Perform your search or any other action here
      };

      // Set a timer for 2 seconds
      const timerId = setTimeout(delayedSearch, 1000);

      // Clear the timer if a new letter is entered before the 2 seconds elapse
      return () => clearTimeout(timerId);
    }
  }, [searchQuery, isSwitchOn]); // Execute the effect w

  const renderCards = (items) => {
    // Filter communities based on the search query
    let filteredCommunities = items;
    if (!isSwitchOn) {
      filteredCommunities = items.filter((item) =>
        (item.firstName + " " + item.lastName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    return filteredCommunities.map((item) => (
      <Card
        key={item._id}
        style={{ marginVertical: 5, marginHorizontal: 2, overflow: "hidden" }}
        onPress={() => {
          navigation.navigate("ProfilePage", {
            user: item,
          });
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
                  <Avatar.Image
                    size={70}
                    source={{ uri: `${BASE_IMG_URL}${item.img}` }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text variant='titleMedium'>
                    {item.firstName + " " + item.lastName}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    ));
  };
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <>
      <TopAppBar></TopAppBar>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 20, paddingTop: 10 }}>
        <Searchbar
          mode='bar'
          style={{ marginBottom: 10 }}
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
          right={() => (
            <>
              <Text variant='labelSmall'>skills</Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </>
          )}
        />

        <ScrollView>
          <LoadingOrError></LoadingOrError>
          {(!isSwitchOn || !searchQuery) && renderCards(volunteers)}

          {queryResponse && searchQuery && renderCards(queryResponse)}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Volunteers;
