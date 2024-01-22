import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, Image, View } from "react-native";
import { Card, Avatar, Text, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities, getVolunteers } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";
import { BASE_IMG_URL } from "../../helpers/image";

const Volunteers = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const volunteers = useSelector((state) => state.user.volunteers);

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

  const renderCards = (items) => {
    // Filter communities based on the search query
    const filteredCommunities = items.filter((item) =>
      (item.firstName + " " + item.lastName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

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
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, paddingTop: 10 }}>
      <Searchbar
        style={{ marginBottom: 10 }}
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <ScrollView>
        <Text variant='titleSmall'>Communities</Text>
        <LoadingOrError></LoadingOrError>
        {renderCards(volunteers)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Volunteers;
