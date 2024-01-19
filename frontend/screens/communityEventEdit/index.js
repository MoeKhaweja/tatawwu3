import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import { useDispatch } from "react-redux";
import { createEvent, editEvent } from "../../store/user";

const CommunityEditEvent = ({ route, navigation }) => {
  const { event } = route.params;
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [eventDetails, setEventDetails] = useState(event);
  const dispatch = useDispatch();
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
      setEventDetails({
        ...eventDetails,
        img: result.assets[0].base64,
      });
    }
  };
  const removeImage = () => {
    setEventDetails({ ...eventDetails, img: "" });
    setImage(null);
  };
  // Function to handle creating an event
  const handleEditEvent = () => {
    try {
      if (image) {
        dispatch(editEvent(eventDetails));
      } else {
        if (eventDetails.img) {
          dispatch(editEvent({ ...eventDetails, img: null }));
        }
      }
    } catch {}
    navigation.navigate("ViewCommunityEvents");
  };

  return (
    <ScrollView style={styles.container}>
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
        <View>
          {eventDetails.img && (
            <Image
              resizeMode='cover'
              style={{ width: "100%", height: 150, marginBottom: 10 }}
              src={`http://192.168.1.5:8000/images/${eventDetails.img}`}
            ></Image>
          )}

          <Button
            mode='contained'
            icon={() => <Icon name='camera' size={20} color='white' />}
            onPress={pickImage}
            style={styles.input}
          >
            Change Image
          </Button>
        </View>
      )}
      <TextInput
        label='Image URL'
        value={eventDetails.img}
        onChangeText={(text) => setEventDetails({ ...eventDetails, img: text })}
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
      <Button mode='contained' onPress={handleEditEvent}>
        Create Event
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignContent: "center",

    flex: 1,
  },
  card: {
    margin: 10,
  },

  input: {
    marginBottom: 10,
  },
});

export default CommunityEditEvent;
