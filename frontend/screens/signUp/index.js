import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Implement signup logic using email and password
    console.log("Signing up with:", email, password);
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
      <Button mode='contained' onPress={handleSignup} style={{ marginTop: 20 }}>
        Sign Up
      </Button>
      <Button
        onPress={() => navigation.navigate("Signin")}
        style={{ marginTop: 10 }}
      >
        Go to Sign In
      </Button>
    </View>
  );
};

export default SignupScreen;
