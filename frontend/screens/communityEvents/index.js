import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
  Avatar,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import { useDispatch, useSelector } from "react-redux";
import { getCommunityEvents } from "../../store/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ViewCommunityEvents = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const communityEvents = useSelector((state) => state.user.communityEvents);

  useFocusEffect(
    useCallback(() => {
      try {
        dispatch(getCommunityEvents());
      } catch {}
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {communityEvents.events?.map((event, index) => (
          <Card key={index} style={styles.card}>
            {/* Include necessary event details in the card */}
            <Card.Cover source={{ uri: "https://via.placeholder.com/300" }} />
            <Card.Content>
              <Title>{event.title}</Title>
              <Paragraph>{event.description}</Paragraph>
              {/* Add more details as needed */}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon='plus'
        onPress={() => navigation.navigate("CommunityAddEvents")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 40,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
  },
});

export default ViewCommunityEvents;
