import React, { useEffect } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { useDispatch } from "react-redux";
import { verifyToken } from "../../store/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const logoScale = new Animated.Value(0.8);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(verifyToken());
    } catch (e) {}
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      // Once animation finishes, navigate to main app screen
      navigation.navigate("EventList");
      navigation.reset({
        index: 0,
        routes: [{ name: "EventList" }],
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: logoScale }] }}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode='contain'
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#256287", // Change this to your desired background color
  },
  logo: {
    width: 200, // Set the width and height according to your logo size
    height: 200,
  },
});

export default SplashScreen;
