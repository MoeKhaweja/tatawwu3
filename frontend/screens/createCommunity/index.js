import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  TextInput,
  Button,
  Avatar,
  IconButton,
  HelperText,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { createCommunity } from "../../store/user";
import theme from "../../theme";
import LoadingOrError from "../../components/loadingOrError";
import { useNavigation } from "@react-navigation/native";

const CreateCommunityScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const owner = useSelector((state) => state.user.user.user.isCommunityOwner);

  if (owner == true) {
    navigation.navigate("ViewCommunityEvents");
  }

  const handleCreateCommunity = async () => {
    if (!name || !description) {
      setError(true);
      return;
    }
    try {
      await dispatch(
        createCommunity({
          name: name,
          description: description,
          img: base64,
        })
      );
    } catch {
      return;
    }
    navigation.navigate("ViewCommunityEvents");
    // Here, you can handle the logic to create a community
    console.log("Creating community:", { name, description });
    // Add your logic to create the community using the provided name and description
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
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

  return (
    <View style={styles.container}>
      {image ? (
        <View>
          <TouchableOpacity onPress={removeImage}>
            <Icon name='times-circle' size={20} color={theme.colors.tertiary} />
          </TouchableOpacity>
          <Avatar.Image
            size={150}
            style={{ marginBottom: 10 }}
            source={{ uri: image }}
          />
        </View>
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Avatar.Icon
            size={150}
            icon='camera'
            onPress={pickImage}
            style={{ marginBottom: 10 }}
          />
        </TouchableOpacity>
      )}
      <HelperText type='error' visible={error}>
        All Inputs Required
      </HelperText>
      <TextInput
        label='Name'
        value={name}
        onChangeText={(text) => {
          setName(text);
          setError(false);
        }}
        style={styles.input}
        error={error && !name}
      />
      <TextInput
        multiline
        error={error && !description}
        label='Description'
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setError(false);
        }}
        style={styles.input}
      />
      <Button
        mode='contained'
        onPress={handleCreateCommunity}
        style={styles.button}
      >
        Create Community
      </Button>
      <LoadingOrError></LoadingOrError>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
  },
});

export default CreateCommunityScreen;
