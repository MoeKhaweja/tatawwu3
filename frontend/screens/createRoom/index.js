import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, HelperText, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { createRoom } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";

const CreateRoom = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createChatRoom = () => {
    // Implement your logic to create a chat room with title, description, and avatar
    // This function could post data to an API or perform any necessary actions
    // For example:
    if (!title || !description) {
      setError(true);
      setErrorMessage("Please fill in all fields");
      return;
    }
    setErrorMessage("");
    try {
      dispatch(createRoom({ title: title, description: description }));
    } catch (error) {
      console.log(error);
    }
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Avatar:", avatar);
    // Add logic here to create the chat room
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{ uri: avatar || "https://via.placeholder.com/150" }}
        style={styles.avatar}
      />
      <Button onPress={() => console.log("Change Avatar")}>
        Change Avatar
      </Button>
      <HelperText type='error' visible={error}>
        {errorMessage}
      </HelperText>
      <TextInput
        label='Title'
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          setError("");
        }}
        style={styles.input}
        error={error && !title}
      />
      <TextInput
        label='Description'
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setError("");
        }}
        style={styles.input}
        multiline
        error={error && !description}
      />
      <Button
        mode='contained'
        onPress={createChatRoom}
        style={styles.createButton}
      >
        Create Chat Room
      </Button>
      <LoadingOrError></LoadingOrError>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  createButton: {
    marginTop: 20,
  },
});

export default CreateRoom;
