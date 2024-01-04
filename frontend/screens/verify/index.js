import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import {
  Card,
  Button,
  IconButton,
  Snackbar,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { verifyImage } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";

export default function Verify() {
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    // console.log(user);

    try {
      dispatch(verifyImage(image));
      // Handle successful login
    } catch (error) {
      console.log(error);
      return;
    }
    setImage(null);
  };

  const toggleSnackbar = () => {
    setSnackbarVisible(!snackbarVisible);
  };

  const closeSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: theme.colors.tertiary,
      }}
    >
      <Card style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          For Identity Verification
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 20 }}>
          You are required to upload an image of your Identity card, you will
          not have full app access if you're not verified
        </Text>
        <Text style={{ marginBottom: 10, color: theme.colors.error }}>
          Skip For Now
        </Text>
        <View
          style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
        >
          {!image ? (
            <Button
              style={{ flex: 1 }}
              mode='contained'
              icon={() => <Icon name='camera' size={20} color='white' />}
              onPress={pickImage}
            >
              Pick Image
            </Button>
          ) : (
            <Button style={{ flex: 1 }} mode='contained' onPress={handleSubmit}>
              Submit Image
            </Button>
          )}

          <IconButton
            icon='information'
            color='gray'
            size={20}
            onPress={toggleSnackbar}
          />
        </View>
        <LoadingOrError></LoadingOrError>
        {image && (
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={removeImage}>
              <Icon name='times-circle' size={20} color='red' />
            </TouchableOpacity>
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 75,
                borderRadius: 10,
                marginTop: 10,
                marginLeft: 5,
              }}
            />
          </View>
        )}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={closeSnackbar}
          duration={5000}
          onTouchMove={closeSnackbar}
        >
          Your data is secure with us. By uploading an image, you agree to the
          use of 3rd party software to process your ID.
        </Snackbar>
      </Card>
    </View>
  );
}
