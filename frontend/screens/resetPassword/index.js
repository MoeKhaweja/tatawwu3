import React, { useState, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const pinInputs = Array(6)
    .fill(0)
    .map((_, index) => useRef(null));
  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;

    if (value !== "") {
      if (index < 5) {
        // Move focus to the next input and place the character there
        pinInputs[index + 1].current.focus();
        newPin[index + 1] = ""; // Clear the next input
      }
    } else {
      // If the current input is empty and backspace is pressed, move focus to the previous input
      if (index > 0) {
        pinInputs[index - 1].current.focus();
      }
    }

    setPin(newPin);
  };

  const handleSubmit = () => {
    const resetPin = pin.join("");
    console.log("Email:", email);
    console.log("Reset Pin:", resetPin);
    setPin(["", "", "", "", "", ""]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <View>
        <Text style={{ marginBottom: 8, marginTop: 8 }}>Enter Reset Pin:</Text>
      </View>

      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handlePinChange(index, text)}
            keyboardType='numeric'
            maxLength={1}
            style={styles.pinInput}
            ref={pinInputs[index]}
          />
        ))}
      </View>

      <Button mode='contained' onPress={handleSubmit} style={styles.button}>
        Reset Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinInput: {
    width: "12%",
  },
  button: {
    marginTop: 16,
  },
});

export default ResetPassword;
