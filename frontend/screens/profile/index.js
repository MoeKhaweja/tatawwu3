import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Card,
  List,
  Divider,
} from "react-native-paper";

const ProfilePage = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    bio: "Passionate developer exploring the world of React Native!",
    userImage: "https://example.com/profile-image.jpg", // Replace with your user image URL
    skills: ["React Native", "JavaScript", "Node.js"],
    academicBackground: [
      "Bachelor in Computer Science",
      "Master in Software Engineering",
    ],
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: user.userImage }} />
        <Card.Content>
          <Title>{`${user.firstName} ${user.lastName}`}</Title>
          <Paragraph>{user.bio}</Paragraph>
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      <Card>
        <Card.Content>
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
              <List.Item key={index} title={background} />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

export default ProfilePage;
