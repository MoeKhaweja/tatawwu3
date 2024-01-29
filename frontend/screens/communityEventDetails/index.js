import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { Button, Card, IconButton, Chip } from "react-native-paper";
import { useDispatch } from "react-redux";
import { accept, getCommunityEvents, reject } from "../../store/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import theme from "../../theme";
import LoadingOrError from "../../components/loadingOrError";

const CommunityEventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [eventDetails, setEventDetails] = useState(event);

  useFocusEffect(
    useCallback(() => {
      try {
        console.log(event);
      } catch (error) {
        console.error(error);
      }
    }, [])
  );

  // Function to handle accepting an applicant
  const handleAcceptApplicant = (applicantId) => {
    console.log("Accepting applicant:", applicantId);
    try {
      dispatch(accept({ applicantId: applicantId, eventId: event._id })).then(
        (res) => dispatch(getCommunityEvents()).catch((err) => console.log(err))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle denying an applicant
  const handleDenyApplicant = (applicantId) => {
    console.log("Denying applicant:", applicantId);
    try {
      dispatch(reject({ applicantId: applicantId, eventId: event._id }));
    } catch (error) {
      console.error(error);
    }
  };

  // Data for FlatList
  const eventDetailsData = [
    { key: "Title", value: eventDetails.title },
    { key: "Description", value: eventDetails.description },
    { key: "Location", value: eventDetails.location },
    { key: "Date", value: eventDetails.schedule.date },
    {
      key: "Time",
      value: `${eventDetails.schedule.startTime} - ${eventDetails.schedule.endTime}`,
    },
  ];

  const renderEventDetail = ({ item }) => (
    <>
      <View style={styles.detailItem}>
        <Text style={styles.detailKey}>{item.key}:</Text>
        {<Text style={styles.detailValue}>{item.value}</Text>}
      </View>
    </>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={[
            { key: "eventDetails", value: eventDetails },
            ...event.applicants,
          ]}
          renderItem={({ item }) => {
            if (item.key === "eventDetails") {
              return (
                <Card style={styles.card}>
                  <View style={styles.eventDetailsHeader}>
                    <Text style={styles.heading}>Event Details</Text>
                    <IconButton
                      icon='pencil'
                      size={20}
                      onPress={() =>
                        navigation.navigate("CommunityEditEvent", {
                          event: eventDetails,
                        })
                      }
                    />
                  </View>
                  {eventDetails.img && (
                    <Image
                      resizeMode='cover'
                      style={{ width: "100%", height: 150, marginTop: 10 }}
                      source={{
                        uri: `http://192.168.1.5:8000/images/${eventDetails.img}`,
                      }}
                    />
                  )}
                  <FlatList
                    data={eventDetailsData}
                    renderItem={renderEventDetail}
                    keyExtractor={(item) => item.key}
                  />
                  <View style={styles.chipsContainer}>
                    {eventDetails.targetedSkills.map((skill, index) => (
                      <Chip
                        key={index}
                        style={styles.chip}
                        textStyle={{ color: "white" }}
                      >
                        {skill}
                      </Chip>
                    ))}
                  </View>
                  <LoadingOrError></LoadingOrError>
                </Card>
              );
            } else {
              return (
                <Card
                  key={item._id}
                  style={styles.applicantCard}
                  onPress={() => {
                    console.log(item);
                    navigation.navigate("ProfilePage", { user: item.user });
                  }}
                >
                  <Card.Content style={styles.applicantContent}>
                    <Text style={styles.applicantName}>
                      {item.user.firstName + " " + item.user.lastName}
                    </Text>
                    <Text>Status: {item.status}</Text>
                  </Card.Content>
                  <Card.Actions>
                    {(item.status === "applied" ||
                      item.status === "pending") && (
                      <View style={styles.buttonsContainer}>
                        <Button onPress={() => handleAcceptApplicant(item._id)}>
                          Accept
                        </Button>
                        <Button onPress={() => handleDenyApplicant(item._id)}>
                          Deny
                        </Button>
                      </View>
                    )}
                  </Card.Actions>
                </Card>
              );
            }
          }}
          keyExtractor={(item) => (item.key ? "eventDetails" : item._id)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailKey: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    margin: 3,
  },
  applicantCard: {
    padding: 5,
    marginBottom: 10,
    margin: 3,
  },
  applicantContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  applicantName: {
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  chip: {
    backgroundColor: theme.colors.tertiary,

    marginRight: 5,
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CommunityEventDetails;
