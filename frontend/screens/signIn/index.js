import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.isAuth);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    if (!email || !password) {
      setError(true);
      setErrorMessage("Please fill in all fields");
      return;
    }
    setRender(true);
  };

  useEffect(() => {
    if (render) {
      try {
        dispatch(
          loginUser({
            email: email,
            password: password,
          })
        );
        // Handle successful login
      } catch (error) {
        console.log(error);
        return;
      }
      setEmail("");
      setPassword("");
      setRender(false);
    }
    if (auth) {
      navigation.navigate("Verify");
      navigation.reset({
        index: 0,
        routes: [{ name: "Verify" }],
      });
    }
  }, [render, auth]);

  const handleSignin = () => {
    // Implement signin logic using email and password
    console.log("Signing in with:", email, password);
    login();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ height: 100, width: 100, alignSelf: "center" }}
        resizeMode='contain'
      />
      <HelperText type='error' visible={error}>
        {errorMessage}
      </HelperText>
      <TextInput
        style={styles.input}
        label='Email'
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        error={error && !email}
      />
      <TextInput
        style={styles.input}
        label='Password'
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError("");
        }}
        error={error && !password}
      />
      <Button mode='contained' onPress={handleSignin} style={styles.input}>
        Sign In
      </Button>
      <Button onPress={() => navigation.navigate("Signup")}>
        Don't Have an Account?
      </Button>
      <Button onPress={() => navigation.navigate("Reset")}>
        Forgot Your Password?
      </Button>
      <LoadingOrError></LoadingOrError>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  input: {
    marginVertical: 10,
  },
});

export default SigninScreen;
