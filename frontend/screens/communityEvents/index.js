import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, FAB, Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityEvents } from "../../store/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import theme from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import TopAppBar from "../../components/appBar";

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
        (year1 == year2 && month1 == month2 && day1 <= day2)
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
      <>
        <SafeAreaView style={styles.filterChipsContainer}>
          <Chip
            mode='outlined'
            onPress={() => setFilter("all")}
            selected={filter === "all"}
            selectedColor='white'
            style={[
              styles.filterChip,
              {
                backgroundColor:
                  filter === "all"
                    ? theme.colors.secondary
                    : theme.colors.tertiary, // Change background color for the active chip
                // Change text color for the active chip
              },
            ]}
            textStyle={{ color: "white" }}
          >
            All
          </Chip>
          <Chip
            mode='outlined'
            selectedColor='white'
            onPress={() => setFilter("past")}
            selected={filter === "past"}
            style={[
              styles.filterChip,
              {
                backgroundColor:
                  filter === "past"
                    ? theme.colors.secondary
                    : theme.colors.tertiary, // Change background color for the active chip
                // Change text color for the active chip
              },
            ]}
            textStyle={{ color: "white" }}
          >
            Completed
          </Chip>
          <Chip
            mode='outlined'
            onPress={() => setFilter("upcoming")}
            selected={filter === "upcoming"}
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
            selectedColor='white'
            textStyle={{ color: "white" }}
          >
            Upcoming
          </Chip>
        </SafeAreaView>
      </>
    );
  };

  return (
    <>
      <TopAppBar></TopAppBar>

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
          color='white'
          icon='plus'
          onPress={() => navigation.navigate("CommunityAddEvents")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    margin: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  filterChipsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  filterChip: {
    marginHorizontal: 2,
  },
});

export default ViewCommunityEvents;
