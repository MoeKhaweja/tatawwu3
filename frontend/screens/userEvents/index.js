import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";

// Dummy data for events
const eventData = [
  { id: "1", name: "Event 1", schedule: "January 20, 2024 08:00 AM" },
  { id: "2", name: "Event 2", schedule: "January 25, 2024 02:30 PM" },
  // Add more events as needed
];

const EventList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.schedule}>{item.schedule}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate("EventDetails", { eventId: item.id })
          }
        >
          Details
        </Button>
        <Button onPress={() => console.log(`Cancel event ${item.id}`)}>
          Cancel
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  schedule: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export { EventList };
