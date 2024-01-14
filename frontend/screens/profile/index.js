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

const ProfilePage = () => {
  const community = {
    name: "Sample Community55",
    description: "This is a test community55",
    img: null, // Replace with your community image URL if available
    events: [
      { $oid: "65a2db38b34cc596f8db1bbd" },
      { $oid: "65a2de08b34cc596f8db1bd1" },
      // ... (add more events as needed)
    ],
    owner: { $oid: "659682fb2eed07a7cd58db2f" },
  };

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
              <List.Subheader>Upcoming Events</List.Subheader>
              {community.events.map((event, index) => (
                <List.Item key={index} title={`Event ${index + 1}`} />
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
  avatar: {
    borderRadius: 75, // Make it circular
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

export default ProfilePage;
