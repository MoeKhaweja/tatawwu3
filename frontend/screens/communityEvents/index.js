import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
} from "react-native-paper";

const ViewCommunityEvents = () => {
  const [events, setEvents] = useState([]); // Events data from your database
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    schedule: "",
    location: "",
    duration: 0,
    image: "", // URL to the event image
  });

  useEffect(() => {
    setEvents(demoEvents);
  }, []);

  const demoEvents = [
    {
      title: "Event 1",
      description: "This is the first event description.",
      schedule: "2024-01-15 10:00 AM",
      location: "Event location 1",
      duration: 120, // in minutes
      image: "https://via.placeholder.com/300", // Sample image URL
    },
    {
      title: "Event 2",
      description: "This is the second event description.",
      schedule: "2024-01-20 02:30 PM",
      location: "Event location 2",
      duration: 90, // in minutes
      image: "https://via.placeholder.com/300", // Sample image URL
    },
    // Add more demo events as needed
  ];

  // Function to handle creating an event
  const handleCreateEvent = () => {
    // Logic to create an event and update the events list
    // You can use the `eventDetails` state to get the event details
    console.log("Creating event:", eventDetails);
    // Implement logic to create an event in your database here
    // Then update the events list using setEvents([...events, newEvent])
    setModalVisible(false); // Close the modal after creating an event
    // Reset event details after creating the event
    setEventDetails({
      title: "",
      description: "",
      schedule: "",
      location: "",
      duration: 0,
      image: "",
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {events?.map((event, index) => (
          <Card key={index} style={styles.card}>
            {/* Include necessary event details in the card */}
            <Card.Cover source={{ uri: event.image }} />
            <Card.Content>
              <Title>{event.title}</Title>
              <Paragraph>{event.description}</Paragraph>
              {/* Add more details as needed */}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon='plus'
        onPress={() => setModalVisible(true)}
      />
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TextInput
              label='Title'
              value={eventDetails.title}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, title: text })
              }
              style={styles.input}
            />
            <TextInput
              label='Description'
              value={eventDetails.description}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, description: text })
              }
              style={styles.input}
            />
            <TextInput
              label='Schedule'
              value={eventDetails.schedule}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, schedule: text })
              }
              style={styles.input}
            />
            <TextInput
              label='Location'
              value={eventDetails.location}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, location: text })
              }
              style={styles.input}
            />
            <TextInput
              label='Image URL'
              value={eventDetails.image}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, image: text })
              }
              style={styles.input}
            />
            <TextInput
              label='Duration (in minutes)'
              value={eventDetails.duration.toString()}
              onChangeText={(text) =>
                setEventDetails({
                  ...eventDetails,
                  duration: parseFloat(text) || 0,
                })
              }
              keyboardType='numeric'
              style={styles.input}
            />
            <Button mode='contained' onPress={handleCreateEvent}>
              Create Event
            </Button>
          </View>
        </Modal>
      </Portal>
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
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 40,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default ViewCommunityEvents;
