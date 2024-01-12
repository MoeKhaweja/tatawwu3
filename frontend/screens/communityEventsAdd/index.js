import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput, Button, List, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { createEvent } from "../../store/user";
import { SafeAreaView } from "react-native-safe-area-context";

const CommunityAddEvents = () => {
  const [inputValue, setInputValue] = useState("");
  const [listData, setListData] = useState([]);

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setListData([...listData, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newList = [...listData];
    newList.splice(index, 1);
    setListData(newList);
  };
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    schedule: "",
    location: "",
    duration: 0,
    img: "", // URL to the event image
    targetedSkills: [],
  });
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
  const handleCreateEvent = async () => {
    await setEventDetails({ ...eventDetails, targetedSkills: listData });
    try {
      dispatch(createEvent(eventDetails)).then(() => {
        navigation.navigate("ViewCommunityEvents");
      });
    } catch {}
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
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
            style={styles.input}
          >
            Pick Image
          </Button>
        )}
        <TextInput
          label='Image URL'
          value={eventDetails.img}
          onChangeText={(text) =>
            setEventDetails({ ...eventDetails, img: text })
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
        <TextInput
          label='Enter value'
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          style={{ marginBottom: 16 }}
        />
        <Button mode='contained' onPress={handleAdd} style={styles.input}>
          Add
        </Button>

        {listData.length > 0 && (
          <List.Section style={{ marginTop: 16 }}>
            <List.Subheader>Values</List.Subheader>
            {listData.map((item, index) => (
              <List.Item
                key={index}
                title={item}
                right={() => (
                  <IconButton
                    icon='delete'
                    onPress={() => handleDelete(index)}
                  />
                )}
              />
            ))}
          </List.Section>
        )}
        <Button mode='contained' onPress={handleCreateEvent}>
          Create Event
        </Button>
      </SafeAreaView>
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

export default CommunityAddEvents;
