import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const RoomDetails = () => {
  const roomDetails = {
    title: "Sample Room",
    description: "This is a sample chat room description.",
    admin: "Admin User",
    creationDate: "January 1, 2023",
    avatar: "",
    members: [
      { name: "User 1" },
      { name: "User 2" },
      { name: "User 3" },
      { name: "User 4" },
      { name: "User 5" },
      { name: "User 6" },
      { name: "User 7" },
      { name: "User 8" },
    ],
  };

  const { title, description, admin, members, avatar, creationDate } =
    roomDetails;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{ uri: avatar || "https://via.placeholder.com/150" }}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text>{description}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text>Admin: {admin}</Text>
        <Text>Creation Date: {creationDate}</Text>
      </View>

      <ScrollView style={styles.membersContainer}>
        <List.Section title='Members'>
          {members.map((member, index) => (
            <List.Item
              key={index.toString()}
              title={member.name}
              left={() => <Avatar.Text label={member.name[0]} />}
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  details: {
    marginBottom: 20,
  },
  membersContainer: {
    flex: 1,
  },
});

export default RoomDetails;
