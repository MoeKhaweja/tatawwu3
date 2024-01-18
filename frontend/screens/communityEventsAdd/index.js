import { useCallback, useState } from "react";
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
import Icon2 from "react-native-vector-icons/Ionicons";
import { TextInput, Button, List, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { createEvent } from "../../store/user";
import { SafeAreaView } from "react-native-safe-area-context";
import { DatePickerModal, TimePickerModal, ro } from "react-native-paper-dates";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CommunityAddEvents = () => {
  const [inputValue, setInputValue] = useState("");
  const [listData, setListData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setVisible(false);
    setStartTime(`${hours}:${minutes}`);
    console.log(hours, minutes);
  };

  const onDismiss2 = useCallback(() => {
    setVisible2(false);
  }, [setVisible2]);

  const onConfirm2 = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setVisible(false);
    setEndTime(`${hours}:${minutes}`);
    console.log(hours, minutes);
  };

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    setOpen(false);
    setDate(date);
    console.log(day, month, year);
  };
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
    try {
      dispatch(
        createEvent({ ...eventDetails, targetedSkills: [...listData] })
      ).then(() => {
        navigation.navigate("ViewCommunityEvents");
      });
    } catch {}
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <TextInput
          label='Event Title'
          value={eventDetails.title}
          onChangeText={(text) =>
            setEventDetails({ ...eventDetails, title: text })
          }
          style={styles.input}
        />
        <TextInput
          label='Event Description'
          value={eventDetails.description}
          onChangeText={(text) =>
            setEventDetails({ ...eventDetails, description: text })
          }
          style={styles.input}
          multiline
        />
        <TextInput
          label='Event Location'
          value={eventDetails.location}
          onChangeText={(text) =>
            setEventDetails({ ...eventDetails, location: text })
          }
          style={styles.input}
        />
        <View
          style={{
            justifyContent: "space-evenly",
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Button
            onPress={() => setOpen(true)}
            uppercase={false}
            mode='contained'
            icon={() => <Icon2 name='calendar' size={20} color='white'></Icon2>}
          >
            Date
          </Button>

          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={open}
            mode='date'
            date={date}
            onConfirm={onConfirmSingle}
            onCancel={onDismissSingle}
          />

          {startTime ? (
            <Button
              mode='contained'
              onPress={() => setVisible(true)}
              uppercase={false}
              icon={() => <Icon2 name='time' size={20} color='white'></Icon2>}
            >
              {startTime}
            </Button>
          ) : (
            <Button
              mode='contained'
              onPress={() => setVisible(true)}
              uppercase={false}
              icon={() => <Icon2 name='time' size={20} color='white'></Icon2>}
            >
              Starts
            </Button>
          )}
          <DateTimePickerModal
            isVisible={visible}
            mode='time'
            onConfirm={onConfirm}
            onCancel={onDismiss}
          />
          {endTime ? (
            <Button
              mode='contained'
              onPress={() => setVisible2(true)}
              uppercase={false}
              icon={() => <Icon2 name='time' size={20} color='white'></Icon2>}
            >
              {endTime}
            </Button>
          ) : (
            <Button
              mode='contained'
              onPress={() => setVisible2(true)}
              uppercase={false}
              icon={() => <Icon2 name='time' size={20} color='white'></Icon2>}
            >
              Ends
            </Button>
          )}
          <DateTimePickerModal
            isVisible={visible2}
            mode='time'
            onConfirm={onConfirm2}
            onCancel={onDismiss2}
          />
        </View>

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
          <View
            style={{
              justifyContent: "space-evenly",
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Button
              mode='contained'
              icon={() => <Icon name='camera' size={20} color='white' />}
              onPress={pickImage}
              style={styles.input}
            >
              Pick Image
            </Button>
          </View>
        )}

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
    paddingHorizontal: 20,

    alignContent: "flex-start",

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
