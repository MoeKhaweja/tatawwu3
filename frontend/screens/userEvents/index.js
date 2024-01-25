import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Button, Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { findEventsByApplicant, getEvent } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../theme";

const EventList = ({ navigation }) => {
  const dispatch = useDispatch();
  let userEvents = useSelector((state) => state.user.eventsApplicationStatus);
  const event = useSelector((state) => state.user.event);

  // State to track the selected filter
  const [filter, setFilter] = useState("upcoming");

  // Sort the events by date
  userEvents.sort(
    (a, b) => new Date(a.schedule.date) - new Date(b.schedule.date)
  );

  useFocusEffect(
    useCallback(() => {
      try {
        dispatch(findEventsByApplicant());
      } catch {}
    }, [])
  );

  // Filter events based on the selected filter
  const filteredEvents = userEvents.filter((item) => {
    if (filter === "completed") {
      return new Date(item.schedule.date) < new Date().setHours(0, 0, 0, 0);
    } else if (filter === "upcoming") {
      return new Date(item.schedule.date) >= new Date().setHours(0, 0, 0, 0);
    }
    return true; // Show all events if no filter is selected
  });

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={<Text style={styles.eventName}>{item.title}</Text>}
        subtitle={
          <>
            <Text style={styles.schedule}>
              {item.schedule.date + "   " + item.status}
            </Text>
          </>
        }
        right={() => (
          <Button
            onPress={async () => {
              try {
                const eventDetails = await dispatch(
                  getEvent({ eventId: item._id })
                );
                console.log(eventDetails.payload);
                navigation.navigate("VolunteerEventDetails", {
                  event: eventDetails.payload,
                });
              } catch {}
            }}
          >
            Details
          </Button>
        )}
      >
        <Text style={styles.eventName}>{item.title}</Text>
        <Text style={styles.schedule}>
          {item.schedule.startTime} {item.schedule.endTime}
        </Text>
      </Card.Title>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Chips for filtering */}
      <View style={styles.chipsContainer}>
        <Chip
          mode='outlined'
          selected={filter === "upcoming"}
          onPress={() => setFilter("upcoming")}
          selectedColor='white'
          style={[
            styles.filterChip,
            {
              backgroundColor:
                filter === "upcoming"
                  ? theme.colors.secondary
                  : theme.colors.tertiary, // Change background color for the active chip
              // Change text color for the active chip
            },
          ]}
          textStyle={{ color: "white" }}
        >
          Upcoming
        </Chip>
        <Chip
          mode='outlined'
          selected={filter === "completed"}
          onPress={() => setFilter("completed")}
          selectedColor='white'
          style={[
            styles.filterChip,
            {
              backgroundColor:
                filter === "completed"
                  ? theme.colors.secondary
                  : theme.colors.tertiary, // Change background color for the active chip
              // Change text color for the active chip
            },
          ]}
          textStyle={{ color: "white" }}
        >
          Completed
        </Chip>
      </View>

      <LoadingOrError />

      {/* FlatList for displaying events */}
      <FlatList
        data={filteredEvents}
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
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
  card: {
    marginBottom: 16,
    margin: 3,
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
