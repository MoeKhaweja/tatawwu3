import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Card,
  List,
  Divider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const ProfilePage = ({ route, userInfo }) => {
  const current = useSelector((state) => state.user.user.user);
  const user = route?.params ? route?.params : current;

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

              <List.Section>
                <List.Subheader>Skills</List.Subheader>
                {user.skills.map((skill, index) => (
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
