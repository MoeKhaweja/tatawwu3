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

const ViewCommunityEvents = () => {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);

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
      <ScrollView style={styles.modalContainer}>
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
        {image ? (
          <View>
            <TouchableOpacity onPress={removeImage}>
              <Icon name='times-circle' size={20} color='red' />
            </TouchableOpacity>
            <Image
              resizeMode='cover'
              height={150}
              style={{ marginBottom: 10, borderRadius: 15 }}
              source={{ uri: image }}
            />
          </View>
        ) : (
          <Button
            mode='contained'
            icon={() => <Icon name='camera' size={20} color='white' />}
            onPress={pickImage}
          >
            Pick Image
          </Button>
        )}
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
      </ScrollView>
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
