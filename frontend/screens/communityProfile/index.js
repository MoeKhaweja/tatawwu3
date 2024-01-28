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
import LoadingOrError from "../../components/loadingOrError";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../../theme";

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
      <View style={styles.topSection}>
        <Avatar.Image
          size={100}
          source={{ uri: `${BASE_IMG_URL}${community.img} ` }}
        />
        <Text variant='headlineSmall'>{community.name}</Text>
        <View>
          <Text variant='labelLarge'>Bio:</Text>
          <Paragraph style={{ color: "#888" }}>
            {community.description}
          </Paragraph>
        </View>
      </View>

      <ScrollView>
        <Card style={{ margin: 3 }}>
          <Card.Content>
            <List.Section
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text variant='labelLarge'>Owner:</Text>

              <Text
                style={{ color: theme.colors.primary }}
                onPress={() =>
                  navigation.navigate("ProfilePage", { user: community.owner })
                }
              >
                {" " +
                  community.owner.firstName +
                  " " +
                  community.owner.lastName}
              </Text>
            </List.Section>

            <Divider style={styles.divider} />

            <Text variant='labelLarge'>Events:</Text>
            <List.Section>
              {events &&
                events?.map((event, index) => (
                  <View key={index}>
                    <List.Item
                      key={index}
                      title={event.title}
                      onPress={() =>
                        navigation.navigate("VolunteerEventDetails", {
                          event: event,
                        })
                      }
                      titleStyle={{ fontWeight: "400", fontSize: 16 }}
                      right={() => (
                        <Icon
                          name='arrow-right'
                          size={20}
                          color={theme.colors.tertiary}
                        />
                      )}
                    />
                    <Divider></Divider>
                  </View>
                ))}
            </List.Section>
            <LoadingOrError></LoadingOrError>
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
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
    gap: 10,
  },

  nameContainer: {
    marginLeft: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

export default CommunityProfilePage;
