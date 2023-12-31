import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";

import axios from "axios";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setValue] = useState("volunteer");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firstName && lastName && email && password) setError(false);
  }, [firstName, lastName, email, password]);

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError(true);
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      setError(true);
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    setError(false);
    setLoading(true);
    setErrorMessage("");

    // Simulating signup delay for 2 seconds (replace with actual signup logic)
    setTimeout(() => {
      setLoading(false);
      console.log(
        "Signing up with:",
        email,
        password,
        firstName,
        lastName,
        role
      );
    }, 2000);

    try {
      const response = await axios.post(
        "http://192.168.1.2:8000/auth/register",
        { email, password, firstName, lastName, role }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <HelperText type='error' visible={error}>
        {errorMessage}
      </HelperText>
      <TextInput
        label='First Name'
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        error={error && !firstName}
      />
      <TextInput
        label='Last Name'
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        error={error && !lastName}
      />
      <TextInput
        label='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={error && !/\S+@\S+\.\S+/.test(email)}
      />
      <TextInput
        label='Password'
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={error && password.length < 8}
      />
      <Text style={{ marginBottom: 8, marginTop: 8 }}>Signing Up as a:</Text>
      <SegmentedButtons
        value={role}
        onValueChange={setValue}
        buttons={[
          {
            value: "volunteer",
            label: "Volunteer",
          },
          {
            value: "community",
            label: "Community",
          },
        ]}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {loading && <ActivityIndicator animating={true} color='#000000' />}
      </View>
      <Button
        mode='contained'
        onPress={handleSignup}
        style={{ marginTop: 20 }}
        disabled={loading}
      >
        Sign Up
      </Button>
      <Button
        onPress={() => navigation.navigate("Signin")}
        style={{ marginTop: 10 }}
      >
        Already have an Account? Sign In
      </Button>
    </View>
  );
};

export default SignupScreen;
