import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/user";
import { useTheme } from "react-native-paper";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setValue] = useState("volunteer");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
    try {
      await dispatch(
        registerUser({ email, password, firstName, lastName, role })
      );
      navigation.navigate("Signin");
      navigation.reset({
        index: 0,
        routes: [{ name: "Signin" }],
      });

      // Handle successful login
    } catch (error) {
      console.log(error);
      setError("opps something wrong happened");
      return;
    }
    setEmail("");
    setPassword("");
    setLoading(false);

    console.log(user);
  };

  return (
    <View style={styles.container}>
      <HelperText type='error' visible={error}>
        {errorMessage}
      </HelperText>
      <TextInput
        style={styles.input}
        label='First Name'
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          setError("");
        }}
        error={error && !firstName}
      />
      <TextInput
        style={styles.input}
        label='Last Name'
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
          setError("");
        }}
        error={error && !lastName}
      />
      <TextInput
        style={styles.input}
        label='Email'
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        error={error && !/\S+@\S+\.\S+/.test(email)}
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
        error={error && password.length < 8}
      />
      <Text style={styles.input}>Signing Up as a:</Text>
      <SegmentedButtons
        theme={{
          colors: {
            secondaryContainer: theme.colors.primary,
            outline: theme.colors.primary,
            onSecondaryContainer: "white",
          },
        }}
        style={styles.input}
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
      {loading && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <ActivityIndicator animating={true} color='#000000' />
        </View>
      )}
      <Button
        mode='contained'
        onPress={handleSignup}
        style={styles.input}
        disabled={loading}
      >
        Sign Up
      </Button>
      <Button onPress={() => navigation.navigate("Signin")}>
        Already have an Account?
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  input: {
    marginVertical: 5,
  },
});

export default SignupScreen;
