import { useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, FAB } from "react-native-paper";

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
          <Card
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate("CommunityEventDetails", { event: event })
            }
          >
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
