import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, FAB, Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityEvents } from "../../store/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ViewCommunityEvents = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const communityEvents = useSelector((state) => state.user.communityEvents);

  // Filter state
  const [filter, setFilter] = useState("all");

  useFocusEffect(
    useCallback(() => {
      try {
        dispatch(getCommunityEvents());
      } catch (error) {
        console.error(error);
      }
    }, [])
  );

  // Function to filter events based on date
  const filterEvents = (event) => {
    // Split the date part into day, month, and year

    const currentDate = new Date();
    const eventDate = new Date(event.schedule.date);

    const year1 = currentDate.getFullYear();
    const month1 = currentDate.getMonth();
    const day1 = currentDate.getDate();

    const year2 = eventDate.getFullYear();
    const month2 = eventDate.getMonth();
    const day2 = eventDate.getDate();

    if (filter === "past") {
      if (
        year1 > year2 ||
        (year1 == year2 && month1 > month2) ||
        (year1 == year2 && month1 == month2 && day1 > day2)
      ) {
        return event;
      } else {
        return null;
      }
    } else if (filter === "upcoming") {
      if (
        year1 < year2 ||
        (year1 == year2 && month1 < month2) ||
        (year1 == year2 && month1 == month2 && day1 < day2)
      ) {
        return event;
      } else {
        return null;
      }
    }
    // No filter or "all" filter
    return event;
  };

  // Function to render filter chips
  const renderFilterChips = () => {
    return (
      <View style={styles.filterChipsContainer}>
        <Chip
          mode='outlined'
          onPress={() => setFilter("all")}
          selected={filter === "all"}
          style={styles.filterChip}
        >
          All Events
        </Chip>
        <Chip
          mode='outlined'
          onPress={() => setFilter("past")}
          selected={filter === "past"}
          style={styles.filterChip}
        >
          Past Events
        </Chip>
        <Chip
          mode='outlined'
          onPress={() => setFilter("upcoming")}
          selected={filter === "upcoming"}
          style={styles.filterChip}
        >
          Upcoming Events
        </Chip>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderFilterChips()}
      <ScrollView>
        {communityEvents.events?.map((event, index) => {
          const { title, description, schedule } = event;
          const { date, startTime, endTime } = schedule;
          const filterResult = filterEvents(event);

          // Skip events based on the selected filter
          if (filter !== "all" && filterResult == null) {
            return null;
          }

          return (
            <Card
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate("CommunityEventDetails", { event: event })
              }
            >
              <Card.Content>
                <Title>{title}</Title>
                <Paragraph>{description}</Paragraph>
                <Paragraph>
                  Date: {date}, Time: {startTime} - {endTime}
                </Paragraph>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon='plus'
        onPress={() => navigation.navigate("CommunityAddEvents")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  filterChipsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  filterChip: {
    marginHorizontal: 5,
  },
});

export default ViewCommunityEvents;
