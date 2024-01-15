import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { accept, reject } from "../../store/user";

const CommunityEventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [eventDetails, setEventDetails] = useState(event);

  useFocusEffect(
    useCallback(() => {
      try {
        console.log(event);
      } catch {}
    }, [])
  );

  // Function to handle accepting an applicant
  const handleAcceptApplicant = (applicantId) => {
    console.log("Accepting applicant:", applicantId);
    try {
      dispatch(accept({ applicantId: applicantId, eventId: event._id }));
    } catch {}
  };

  // Function to handle denying an applicant
  const handleDenyApplicant = (applicantId) => {
    console.log("Denying applicant:", applicantId);
    try {
      dispatch(reject({ applicantId: applicantId, eventId: event._id }));
    } catch {}
  };

  return (
    <ScrollView style={styles.container}>
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
          <Text>- {eventDetails.duration} minutes</Text>
          <Image
            resizeMode='cover'
            style={{ width: "100%", height: 150 }}
            src={`http://192.168.1.2:8000/images/${eventDetails.img}`}
          ></Image>
        </Card>
      </View>

      {/* Display list of applicants */}
      <View style={styles.section}>
        <Text style={styles.heading}>Applicants</Text>
        {event.applicants?.map((applicant) => (
          <Card
            key={applicant._id}
            style={styles.applicant}
            onPress={() => {
              console.log(applicant);
              navigation.navigate("ProfilePage", { user: applicant.user });
            }}
          >
            <Card.Content
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>
                {applicant.user.firstName + " " + applicant.user.lastName}
              </Text>
              <Text>Status: {applicant.status}</Text>
            </Card.Content>
            <Card.Actions>
              {(applicant.status === "applied" ||
                applicant.status === "pending") && (
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
