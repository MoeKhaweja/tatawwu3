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
          {/* Top section with circular avatar, first and last name */}
          <View style={styles.topSection}>
            <Avatar.Image
              size={150}
              source={{ uri: user.userImage }}
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <Title>{user.firstName}</Title>
              <Title>{user.lastName}</Title>
            </View>
          </View>
          <Card style={{ margin: 3 }}>
            <Card.Content>
              <Paragraph>{user.bio}</Paragraph>

              <Divider style={styles.divider} />
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

              <List.Section>
                <List.Subheader>Skills</List.Subheader>
                {user.skills?.map((skill, index) => (
                  <List.Item key={index} title={skill} />
                ))}
              </List.Section>

              <Divider style={styles.divider} />

              <List.Section>
                <List.Subheader>Academic Background</List.Subheader>
                {user.academicBackground.map((background, index) => (
                  <List.Item key={index} title={background.degreeTitle} />
                ))}
              </List.Section>
            </Card.Content>
          </Card>
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
});

export default ProfilePage;
