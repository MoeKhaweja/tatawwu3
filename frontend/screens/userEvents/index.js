import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Button, Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { findEventsByApplicant, getEvent } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../theme";
import TopAppBar from "../../components/appBar";

const EventList = ({ navigation }) => {
  const dispatch = useDispatch();
  const userEvents = useSelector((state) => state.user.eventsApplicationStatus);
  const event = useSelector((state) => state.user.event);

  // State to track the selected filter
  const [filter, setFilter] = useState("upcoming");

  // Sort the events by date
  let events = [...userEvents].sort(
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
  const filteredEvents = events.filter((item) => {
    if (filter === "completed") {
      return new Date(item.schedule.date) < new Date().setHours(0, 0, 0, 0);
    } else if (filter === "upcoming") {
      return new Date(item.schedule.date) >= new Date().setHours(0, 0, 0, 0);
    }
    return true; // Show all events if no filter is selected
  });

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={async () => {
        try {
          const eventDetails = await dispatch(getEvent({ eventId: item._id }));
          console.log(eventDetails.payload);
          navigation.navigate("VolunteerEventDetails", {
            event: eventDetails.payload,
          });
        } catch {}
      }}
    >
      <Card.Title
        title={<Text style={styles.eventName}>{item.title}</Text>}
        subtitle={
          <>
            <Text style={styles.schedule}>{item.schedule.date + "   "}</Text>
            <Text
              style={[
                styles.schedule,
                {
                  color:
                    item.status == "pending"
                      ? theme.colors.tertiary
                      : item.status == "accepted"
                      ? "green"
                      : "red",
                },
              ]}
            >
              {item.status}
            </Text>
          </>
        }
      >
        <Text style={styles.eventName}>{item.title}</Text>
        <Text style={styles.schedule}>
          {item.schedule.startTime} {item.schedule.endTime}
        </Text>
      </Card.Title>
    </Card>
  );

  return (
    <>
      <TopAppBar></TopAppBar>
      <View style={styles.container}>
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

        {filteredEvents.length == 0 && (
          <Text style={{ alignSelf: "center" }}>No Events</Text>
        )}
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    </>
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
    color: "#888",
  },
});

export { EventList };
