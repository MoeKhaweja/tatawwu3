import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  Button,
  IconButton,
  List,
  Snackbar,
  RadioButton,
  Divider,
  Portal,
  Modal,
  Card,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user";
import { useNavigation } from "@react-navigation/native";

const CompleteProfilePage = ({ route }) => {
  const extracted = route.params?.extracted ? route.params : null; // Accessing passed props
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setdate] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [academicBackground, setAcademicBackgrounds] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [instituteInput, setInstituteInput] = useState("");
  const [error, setError] = useState(null);
  const [gender, setGender] = useState();
  const [bio, setBio] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    setdate(`${day}/${month}/${year}`);
    hideDatePicker();
  };

  const showModal = () => setModalVisible(true);
  const showModal2 = () => setModalVisible2(true);
  const hideModal = () => setModalVisible(false);
  const hideModal2 = () => setModalVisible2(false);

  useEffect(() => {
    if (extracted?.extracted.skills) {
      setSkills(extracted.extracted.skills);
    }
    if (extracted?.extracted.academicHistory) {
      setAcademicBackgrounds(extracted.extracted.academicHistory);
    }
    if (extracted?.extracted.bio) {
      setBio(extracted.extracted.bio);
    }
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }

    console.log(skills);
  }, []);
  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    } else {
      setError("Skill cannot be empty");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleAddAcademicBackground = () => {
    if (titleInput.trim() !== "" && instituteInput.trim() !== "") {
      setAcademicBackgrounds([
        ...academicBackground,
        { degreeTitle: titleInput, Institution: instituteInput },
      ]);
      setTitleInput("");
      setInstituteInput("");
    } else {
      setError("Title and Institute cannot be empty");
    }
  };

  const handleRemoveAcademicBackground = (index) => {
    const updatedAcademicBackgrounds = academicBackground.filter(
      (_, i) => i !== index
    );
    setAcademicBackgrounds(updatedAcademicBackgrounds);
  };

  const handleSubmit = () => {
    navigation.navigate("Home");

    dispatch(
      updateUser({
        firstName,
        lastName,
        skills,
        academicBackground,
        bio,
        birthdate: date,
        gender,
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TextInput
        label='First Name'
        value={firstName}
        onChangeText={setFirstName}
        style={{ marginVertical: 5 }}
      />
      <TextInput
        label='Last Name'
        value={lastName}
        onChangeText={setLastName}
        style={{ marginVertical: 5 }}
      />
      <TextInput
        label='Bio'
        value={bio}
        onChangeText={setBio}
        multiline
        style={{ marginVertical: 5 }}
      />
      <Text style={{ marginTop: 10 }}>Select your gender:</Text>
      <RadioButton.Group
        onValueChange={(value) => setGender(value)}
        value={gender}
      >
        <View style={{ flexDirection: "row" }}>
          <RadioButton.Item label='Male' value='male' />
          <RadioButton.Item label='Female' value='female' />
          <RadioButton.Item label='Other' value='other' />
        </View>
      </RadioButton.Group>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Button mode='contained' icon='calendar' onPress={showDatePicker}>
          {date ? date : "Birth Date"}
        </Button>
        <DateTimePickerModal
          maximumDate={new Date()}
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          marginTop: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18, flex: 1 }}>Skills</Text>
        <IconButton
          mode='contained'
          icon='plus'
          size={20}
          onPress={showModal}
        />
      </View>
      <Card>
        {skills.map((skill, index) => {
          return (
            <View key={index}>
              <List.Item
                titleNumberOfLines={4}
                descriptionNumberOfLines={4}
                titleStyle={{ flexWrap: "wrap" }}
                key={index}
                title={skill}
                right={() => (
                  <IconButton
                    icon='delete'
                    style={{ padding: 0, margin: 0 }}
                    size={20}
                    onPress={() => handleRemoveSkill(index)}
                  />
                )}
              />
              <Divider></Divider>
            </View>
          );
        })}
      </Card>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          marginTop: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18, flex: 1 }}>Academic Backgrounds</Text>
        <IconButton
          mode='contained'
          icon='plus'
          size={20}
          onPress={showModal2}
        />
      </View>
      <Card>
        {academicBackground.map((background, index) => (
          <List.Item
            titleStyle={{ flexWrap: "wrap" }}
            titleNumberOfLines={4}
            descriptionNumberOfLines={4}
            descriptionStyle={{ flexWrap: "wrap" }}
            key={index}
            title={background.degreeTitle}
            description={background.Institution}
            right={() => (
              <IconButton
                icon='delete'
                onPress={() => handleRemoveAcademicBackground(index)}
              />
            )}
          />
        ))}
      </Card>
      <Button mode='contained' onPress={handleSubmit}>
        Submit
      </Button>

      <Snackbar
        visible={error !== null}
        onDismiss={() => setError(null)}
        duration={4000}
      >
        {error}
      </Snackbar>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            margin: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              label='Skill'
              value={skillInput}
              onChangeText={setSkillInput}
              style={{ flex: 1 }}
            />
            <IconButton
              mode='contained'
              icon='plus'
              onPress={() => {
                handleAddSkill();
                hideModal();
              }}
            />
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={modalVisible2}
          onDismiss={hideModal2}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            margin: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <TextInput
              label='Title'
              value={titleInput}
              onChangeText={setTitleInput}
              style={{ width: "100%" }}
            />
            <TextInput
              label='Institute'
              value={instituteInput}
              onChangeText={setInstituteInput}
              style={{ width: "100%" }}
            />
            <IconButton
              mode='contained'
              icon='plus'
              size={20}
              onPress={() => {
                handleAddAcademicBackground();
                hideModal2();
              }}
            />
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default CompleteProfilePage;
