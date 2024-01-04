import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  Button,
  IconButton,
  List,
  Snackbar,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CompleteProfilePage = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [academicBackgrounds, setAcademicBackgrounds] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [instituteInput, setInstituteInput] = useState("");
  const [error, setError] = useState(null);

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
        ...academicBackgrounds,
        { title: titleInput, institute: instituteInput },
      ]);
      setTitleInput("");
      setInstituteInput("");
    } else {
      setError("Title and Institute cannot be empty");
    }
  };

  const handleRemoveAcademicBackground = (index) => {
    const updatedAcademicBackgrounds = academicBackgrounds.filter(
      (_, i) => i !== index
    );
    setAcademicBackgrounds(updatedAcademicBackgrounds);
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
      <Button onPress={showDatePicker}>Show Date Picker</Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Skills</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          label='Skill'
          value={skillInput}
          onChangeText={setSkillInput}
          style={{ flex: 1, marginRight: 10 }}
        />
        <Button mode='contained' onPress={handleAddSkill}>
          Add Skill
        </Button>
      </View>
      {skills.map((skill, index) => (
        <List.Item
          key={index}
          title={skill}
          right={() => (
            <IconButton
              icon='delete'
              onPress={() => handleRemoveSkill(index)}
            />
          )}
        />
      ))}

      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        Academic Backgrounds
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          label='Title'
          value={titleInput}
          onChangeText={setTitleInput}
          style={{ flex: 1, marginRight: 10 }}
        />
        <TextInput
          label='Institute'
          value={instituteInput}
          onChangeText={setInstituteInput}
          style={{ flex: 1, marginRight: 10 }}
        />
        <Button mode='contained' onPress={handleAddAcademicBackground}>
          Add Background
        </Button>
      </View>
      {academicBackgrounds.map((background, index) => (
        <List.Item
          key={index}
          title={background.title}
          description={background.institute}
          right={() => (
            <IconButton
              icon='delete'
              onPress={() => handleRemoveAcademicBackground(index)}
            />
          )}
        />
      ))}

      <Snackbar
        visible={error !== null}
        onDismiss={() => setError(null)}
        duration={4000}
      >
        {error}
      </Snackbar>
    </ScrollView>
  );
};

export default CompleteProfilePage;
