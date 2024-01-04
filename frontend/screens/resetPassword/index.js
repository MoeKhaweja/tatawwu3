import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { sendPin, verifyPin } from "../../store/user";
import { useDispatch } from "react-redux";
import LoadingOrError from "../../components/loadingOrError";

const ResetPassword = ({ navigation }) => {
  dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [send, setSend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const pinInputs = Array(6)
    .fill(0)
    .map((_, index) => useRef(null));
  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;

    if (value !== "") {
      if (index < 5) {
        pinInputs[index + 1].current.focus();
        newPin[index + 1] = "";
      }
    } else {
      if (index > 0) {
        pinInputs[index - 1].current.focus();
      }
    }

    setPin(newPin);
  };

  const handleSubmit = async () => {
    const resetPin = pin.join("");
    console.log(password, resetPin);
    setPin(["", "", "", "", "", ""]);

    if (email && password && resetPin) {
      try {
        dispatch(
          verifyPin({
            email: email,
            password: password,
            token: resetPin,
            navigation: navigation,
          })
        );
        console.log("successful");
        setPin(["", "", "", "", "", ""]);
        setPassword("");
        setEmail("");

        // Handle successful login
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please fill in all fields");
    }
  };
  const handleSend = () => {
    console.log(email);
    setSend(true);

    setTimeLeft(5 * 60); // 5 minutes in seconds
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      setSend(false);
      clearInterval(timer);
      setTimeLeft(0);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    try {
      dispatch(
        sendPin({
          email: email,
        })
      );
      // Handle successful login
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Clean up interval on unmounting component
    return () => {
      clearInterval();
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <TextInput
        label='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Button
        mode='contained'
        onPress={handleSend}
        style={styles.button}
        disabled={send}
      >
        {!send
          ? "Send Reset Pin"
          : "Resend " +
            minutes.toString().padStart(1, "0") +
            ":" +
            seconds.toString().padStart(2, "0")}
      </Button>
      <LoadingOrError></LoadingOrError>
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
      <TextInput
        label='New Password'
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />

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
    marginVertical: 10,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  pinInput: {
    width: "12%",
  },
  button: {
    marginVertical: 10,
  },
});

export default ResetPassword;
