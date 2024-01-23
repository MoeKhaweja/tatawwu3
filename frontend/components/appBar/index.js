import * as React from "react";
import { Image, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import theme from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { BASE_IMG_URL } from "../../helpers/image";

const TopAppBar = () => {
  const image = useSelector((state) => state.user.user.user.userImage);

  return (
    <>
      <SafeAreaView
        style={{
          justifyContent: "space-between",
          alignContent: "center",
          backgroundColor: theme.colors.primary,
          paddingTop: 5,
          paddingBottom: 15,
          paddingHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          resizeMode='contain'
          style={{ height: 40, width: 40 }}
        />
        <Avatar.Image
          source={{
            uri: `${BASE_IMG_URL}${image}`,
          }}
          size={40}
        />
      </SafeAreaView>
    </>
  );
};

export default TopAppBar;
