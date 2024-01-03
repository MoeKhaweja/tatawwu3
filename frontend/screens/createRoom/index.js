import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Avatar, Button, TextInput as PaperInput } from "react-native-paper";

const CreateRoom = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");

  const createChatRoom = () => {
    // Implement your logic to create a chat room with title, description, and avatar
    // This function could post data to an API or perform any necessary actions
    // For example:
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
      <PaperInput
        label='Title'
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <PaperInput
        label='Description'
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.input}
        multiline
      />
      <Button
        mode='contained'
        onPress={createChatRoom}
        style={styles.createButton}
      >
        Create Chat Room
      </Button>
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
