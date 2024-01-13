import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createCommunity } from "../../store/user";

const VolunteerEventDetails = ({ route, navigation }) => {
  const { event } = route.params;
  const user = useSelector((state) => state.user.user.user);

  const dispatch = useDispatch();

  const [applicantStatus, setApplicantStatus] = useState(null);

  const handleApply = () => {
    try {
      console.log(event.applicants);
    } catch {}
    // Logic to apply for the event and update the applicantStatus state
    console.log("Applying for the event");
  };

  const handleCancelApplication = () => {
    // Logic to cancel the application and update the applicantStatus state
    console.log("Canceling the application");
  };
  const isUserApplied = event.applicants.forEach((applicant) => {
    applicant.user == user.id;
    console.log(applicant.user, user.id);
  });

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover
          src={`http://192.168.1.5:8000/images/${event.img}`}
          style={styles.eventImage}
        />
        <Card.Content>
          <Title>{event.title}</Title>
          <Paragraph>{event.description}</Paragraph>
          <Paragraph>Schedule: {event.schedule}</Paragraph>
          <Paragraph>Location: {event.location}</Paragraph>
          <Paragraph>Duration: {event.duration} minutes</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        {isUserApplied && (
          <Button mode='contained' onPress={handleCancelApplication}>
            Cancel Application
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
