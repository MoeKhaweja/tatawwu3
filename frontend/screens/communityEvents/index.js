import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
  Avatar,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import { useDispatch, useSelector } from "react-redux";
import { getCommunityEvents } from "../../store/user";
import { useNavigation } from "@react-navigation/native";

const ViewCommunityEvents = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
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
  const dispatch = useDispatch();
  const communityEvents = useSelector((state) => state.user.communityEvents);

  useEffect(() => {
    try {
      dispatch(getCommunityEvents());
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    console.log(communityEvents);
  }, [communityEvents]);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64(result.assets[0].base64);
    }
  };
  const removeImage = () => {
    setImage(null);
  };
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
        {communityEvents.events?.map((event, index) => (
          <Card key={index} style={styles.card}>
            {/* Include necessary event details in the card */}
            <Card.Cover source={{ uri: "https://via.placeholder.com/300" }} />
            <Card.Content>
              <Title>{event.title}</Title>
              <Paragraph>{event.description}</Paragraph>
              {/* Add more details as needed */}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB style={styles.fab} icon='plus' />
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
