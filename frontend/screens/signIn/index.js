import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";

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
    if (render == true) {
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
    <View
      style={{
        padding: 20,
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <HelperText type='error' visible={error}>
        {errorMessage}
      </HelperText>
      <TextInput
        label='Email'
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        error={error && !email}
      />
      <TextInput
        label='Password'
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError("");
        }}
        error={error && !password}
      />
      <Button mode='contained' onPress={handleSignin} style={{ marginTop: 20 }}>
        Sign In
      </Button>
      <Button
        onPress={() => navigation.navigate("Signup")}
        style={{ marginTop: 10 }}
      >
        Go to Sign Up
      </Button>
      <Button
        onPress={() => navigation.navigate("Reset")}
        style={{ marginTop: 10 }}
      >
        Reset
      </Button>
      <LoadingOrError></LoadingOrError>
    </View>
  );
};

export default SigninScreen;
