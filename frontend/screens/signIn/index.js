import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    // Implement signin logic using email and password
    console.log("Signing in with:", email, password);
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
    </View>
  );
};

export default SigninScreen;
