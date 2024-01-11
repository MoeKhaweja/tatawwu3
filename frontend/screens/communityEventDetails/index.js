import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";

const CommunityEventDetails = ({ route, navigation }) => {
  // const { eventId } = route.params;

  const [eventDetails, setEventDetails] = useState({
    title: "Demo Event",
    description: "This is a demo event description.",
    schedule: "2024-01-15 10:00 AM",
    location: "Demo Event Location",
    img: "https://via.placeholder.com/300", // Sample image URL
    duration: 120,
  });
  const [applicants, setApplicants] = useState([
    {
      _id: "1",
      user: { _id: "user1", name: "Applicant 1" },
      status: "applied",
    },
    {
      _id: "2",
      user: { _id: "user2", name: "Applicant 2" },
      status: "applied",
    },
    {
      _id: "3",
      user: { _id: "user3", name: "Applicant 3" },
      status: "accepted",
    },
    {
      _id: "4",
      user: { _id: "user4", name: "Applicant 4" },
      status: "denied",
    },
  ]);

  const fetchEventDetails = () => {
    console.log("Fetching event details for eventId:");
  };

  useEffect(() => {
    fetchEventDetails(); // Fetch event details when the component mounts
  }, []);

  // Function to handle accepting an applicant
  const handleAcceptApplicant = (applicantId) => {
    console.log("Accepting applicant:", applicantId);
  };

  // Function to handle denying an applicant
  const handleDenyApplicant = (applicantId) => {
    console.log("Denying applicant:", applicantId);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Display event details */}
      <View style={styles.section}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>Event Details</Text>
          <IconButton
            icon='pencil'
            size={20}
            onPress={() =>
              navigation.navigate("CommunityEditEvent", {
                event: eventDetails,
              })
            }
          ></IconButton>
        </View>

        <Card style={styles.applicant}>
          <Text>- {eventDetails.title}</Text>
          <Text>- {eventDetails.description}</Text>
          <Text>- {eventDetails.location}</Text>
          <Text>- {eventDetails.schedule}</Text>
          <Text>- {eventDetails.img}</Text>
          <Text>- {eventDetails.duration} minutes</Text>
        </Card>
        {/* Display event details for editing */}
        {/* Update TextInput values with eventDetails state */}
      </View>

      {/* Display list of applicants */}
      <View style={styles.section}>
        <Text style={styles.heading}>Applicants</Text>
        {applicants.map((applicant) => (
          <Card key={applicant._id} style={styles.applicant}>
            <Card.Content
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{applicant.user.name}</Text>
              <Text>Status: {applicant.status}</Text>
            </Card.Content>
            <Card.Actions>
              {applicant.status === "applied" && (
                <View style={styles.buttonsContainer}>
                  <Button onPress={() => handleAcceptApplicant(applicant._id)}>
                    Accept
                  </Button>
                  <Button onPress={() => handleDenyApplicant(applicant._id)}>
                    Deny
                  </Button>
                </View>
              )}
            </Card.Actions>
          </Card>
        ))}
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
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  applicant: {
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 2,
  },
  applicantActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});

export default CommunityEventDetails;
