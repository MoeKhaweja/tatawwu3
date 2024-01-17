import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { findEventsByApplicant } from "../../store/user";

const EventList = ({ navigation }) => {
  const dispatch = useDispatch();
  const userEvents = useSelector((state) => state.user.eventsApplicationStatus);

  useFocusEffect(
    useCallback(() => {
      try {
        dispatch(findEventsByApplicant());
      } catch {}
    }, [])
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.eventName}>{item.title}</Text>
        <Text style={styles.schedule}>{item.schedule}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate("EventDetails", { eventId: item._id })
          }
        >
          Details
        </Button>
        <Button onPress={() => console.log(`Cancel event ${item._id}`)}>
          Cancel
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userEvents}
        keyExtractor={(item) => item._id}
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
