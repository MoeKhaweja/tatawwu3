import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Card,
  List,
  Divider,
  Button,
  Chip,
  Subheading,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import theme from "../../theme";

const ProfilePage = ({ route, userInfo }) => {
  const current = useSelector((state) => state.user.user.user);
  const user = route?.params ? route?.params.user : current;
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Avatar.Image size={120} source={user.image} />
            <Title style={styles.title}>
              {user.firstName} {user.lastName}
            </Title>
            <Subheading style={styles.subheading}>{user.bio}</Subheading>
          </View>
          <Divider></Divider>

          <Paragraph>{user.bio}</Paragraph>

          <Divider style={styles.divider} />
          <Text variant='titleSmall'>Skills:</Text>
          <View style={styles.chipsContainer}>
            {user.skills?.map((skill, index) => (
              <Chip
                key={index}
                textStyle={{ color: "white" }}
                style={{
                  margin: 2,
                  backgroundColor: theme.colors.tertiary,
                }}
              >
                {skill}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          <List.Section>
            <List.Subheader>Academic Background</List.Subheader>
            {user.academicBackground.map((background, index) => (
              <List.Item key={index} title={background.degreeTitle} />
            ))}
          </List.Section>

          {!route?.params && (
            <Button
              mode='contained'
              onPress={() => {
                try {
                  AsyncStorage.removeItem("token").then(() => {
                    navigation.navigate("Signin");
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Signin" }],
                    });
                  });
                } catch (e) {
                  // remove error
                }

                console.log("Done.");
              }}
            >
              Logout
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  nameContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginLeft: 16,
  },
  divider: {
    marginVertical: 16,
  },

  header: {
    marginVertical: 16,
    alignItems: "center",
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    marginTop: 4,
    fontSize: 16,
    color: "#666",
  },
});

export default ProfilePage;
