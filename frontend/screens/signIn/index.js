import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.isAuth);
  const [render, setRender] = useState(false);

  const login = async () => {
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
    <View style={{ padding: 20 }}>
      <TextInput
        label='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label='Password'
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
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
    </View>
  );
};

export default SigninScreen;
