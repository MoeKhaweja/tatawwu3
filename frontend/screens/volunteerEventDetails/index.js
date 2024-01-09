import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const VolunteerEventDetails = ({ route, navigation }) => {
  //   const { eventId } = route.params;
  const userId = "user1";

  const [eventDetails, setEventDetails] = useState({
    title: "Demo Event",
    description: "This is a demo event description.",
    schedule: "2024-01-15 10:00 AM",
    location: "Demo Event Location",
    image: "https://via.placeholder.com/300", // Sample image URL
    duration: 120,
  });

  const [applicantStatus, setApplicantStatus] = useState(null);

  const fetchEventData = () => {
    console.log("Fetching event details for eventId:");
    console.log("Fetching applicant status for userId:", userId);
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleApply = () => {
    // Logic to apply for the event and update the applicantStatus state
    console.log("Applying for the event");
  };

  const handleCancelApplication = () => {
    // Logic to cancel the application and update the applicantStatus state
    console.log("Canceling the application");
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover
          source={{ uri: eventDetails.image }}
          style={styles.eventImage}
        />
        <Card.Content>
          <Title>{eventDetails.title}</Title>
          <Paragraph>{eventDetails.description}</Paragraph>
          <Paragraph>Schedule: {eventDetails.schedule}</Paragraph>
          <Paragraph>Location: {eventDetails.location}</Paragraph>
          <Paragraph>Duration: {eventDetails.duration} minutes</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        {applicantStatus === "applied" || applicantStatus === "accepted" ? (
          <Button mode='contained' onPress={handleCancelApplication}>
            Cancel Application
          </Button>
        ) : (
          <Button mode='contained' onPress={handleApply}>
            Apply
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  eventImage: {
    height: 200,
  },
});

export default VolunteerEventDetails;
