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
import {
  TextInput,
  Button,
  List,
  IconButton,
  Chip,
  HelperText,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { createEvent } from "../../store/user";
import { SafeAreaView } from "react-native-safe-area-context";
import { DatePickerModal, TimePickerModal, ro } from "react-native-paper-dates";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import theme from "../../theme";

const CommunityEditEvent = ({ route }) => {
  const { event } = route.params;
  const [inputValue, setInputValue] = useState("");
  const [listData, setListData] = useState([...event.targetedSkills]);
  const [date, setDate] = useState(new Date(event.schedule.date));
  const [startTime, setStartTime] = useState(event.schedule.startTime);
  const [endTime, setEndTime] = useState(event.schedule.endTime);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setOpen(false);
    setDate(date);
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
  const [image, setImage] = useState(
    `http://192.168.1.5:8000/images/${event.img}`
  );
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
  const handleEditEvent = () => {
    try {
      dispatch(editEvent(eventDetails));
    } catch {}
    navigation.navigate("ViewCommunityEvents");
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {error && (
          <HelperText type='error' visible={error}>
            {errorMessage}
          </HelperText>
        )}
        <TextInput
          label='Event Title'
          value={eventDetails.title}
          onChangeText={(text) => {
            setEventDetails({ ...eventDetails, title: text });
            setError("");
          }}
          style={styles.input}
          error={error && !eventDetails.title}
        />
        <TextInput
          label='Event Description'
          value={eventDetails.description}
          onChangeText={(text) => {
            setError("");
            setEventDetails({ ...eventDetails, description: text });
          }}
          style={styles.input}
          multiline
          error={error && !eventDetails.description}
        />
        <TextInput
          label='Event Location'
          value={eventDetails.location}
          onChangeText={(text) => {
            setError("");
            setEventDetails({ ...eventDetails, location: text });
          }}
          style={styles.input}
          error={error && !eventDetails.location}
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
              <Icon
                name='times-circle'
                size={20}
                color={theme.colors.tertiary}
              />
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            label='Event Targeted Skills'
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            style={{ flex: 1 }}
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon name='plus' size={24} color={theme.colors.primary} />
                )} // You can customize the icon here
                onPress={handleAdd}
              />
            }
            error={error && listData != []}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
            flexWrap: "wrap",
          }}
        >
          {listData.map((item, index) => (
            <Chip
              key={index}
              textStyle={{ color: "white" }}
              style={{
                margin: 2,
                backgroundColor: theme.colors.tertiary,
              }}
              icon={() => <Icon name='close' size={12} color='white' />}
              onPress={() => handleDelete(index)}
            >
              {item}
            </Chip>
          ))}
        </View>
        <Button
          mode='contained'
          onPress={handleEditEvent}
          style={styles.createEventButton}
        >
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

export default CommunityEditEvent;
