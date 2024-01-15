import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Card,
  List,
  Divider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CommunityProfilePage = ({ route }) => {
  const { events, community } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top section with circular avatar, community name, and description */}
      <View style={styles.topSection}>
        <Avatar.Image
          size={150}
          source={{ uri: community.img }} // Use community image if available
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
            <List.Section>
              <List.Subheader>Owner</List.Subheader>
              {/* Display owner information (you may fetch it from your API) */}
            </List.Section>

            <Divider style={styles.divider} />

            <List.Section>
              <List.Subheader>Events:</List.Subheader>
              {events.map((event, index) => (
                <View key={index}>
                  <Divider></Divider>
                  <List.Item key={index} title={event.title} />
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
