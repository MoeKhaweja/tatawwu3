import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Card,
  List,
  Divider,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityEventsUser } from "../../store/user";
import { BASE_IMG_URL } from "../../helpers/image";

const CommunityProfilePage = ({ route }) => {
  const navigation = useNavigation();
  const { community } = route.params;
  const events = useSelector((state) => state.user.volunteerEvents);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(getCommunityEventsUser({ communityId: community._id }));
      console.log(community);
    } catch {}
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top section with circular avatar, community name, and description */}
      <View style={styles.topSection}>
        <Avatar.Image
          size={100}
          source={{ uri: `${BASE_IMG_URL}${community.img} ` }} // Use community image if available
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Title>{community.name}</Title>
          <Paragraph>{community.description}</Paragraph>
        </View>
      </View>

      <ScrollView>
        {/* Community details */}
        <Card style={{ margin: 3 }}>
          <Card.Content>
            <List.Section
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <List.Subheader>Owner</List.Subheader>
              <Text
                onPress={() =>
                  navigation.navigate("ProfilePage", { user: community.owner })
                }
              >
                {community.owner.firstName + " " + community.owner.lastName}
              </Text>
            </List.Section>

            <Divider style={styles.divider} />

            <List.Section>
              <List.Subheader>Events:</List.Subheader>
              {events &&
                events?.map((event, index) => (
                  <View key={index}>
                    <Divider></Divider>
                    <List.Item
                      key={index}
                      title={event.title}
                      onPress={() =>
                        navigation.navigate("VolunteerEventDetails", {
                          event: event,
                        })
                      }
                    />
                  </View>
                  // You may want to fetch and display more details for each event
                ))}
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

export default CommunityProfilePage;
