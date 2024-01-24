import * as React from "react";
import { Image, StatusBar, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import theme from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { BASE_IMG_URL } from "../../helpers/image";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";

const TopAppBar = () => {
  const image = useSelector((state) => state.user.user.user.userImage);
  const role = useSelector((state) => state.user.user.user.role);
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle='light-content'
      />
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Icon
            name='calendar'
            color='white'
            size={30}
            onPress={() => navigation.navigate("EventList")}
          />
          {role == "volunteer" && (
            <Avatar.Image
              source={{
                uri: `${BASE_IMG_URL}${image}`,
              }}
              size={40}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default TopAppBar;
