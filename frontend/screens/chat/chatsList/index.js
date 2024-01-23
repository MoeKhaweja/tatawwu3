import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  List,
  Avatar,
  Divider,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
  Text,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, getRoom, getUserRooms } from "../../../store/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ChatRoomList = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.user.rooms);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const addNewRoom = async () => {
    try {
      await dispatch(createRoom({ title: roomName, description: description }));
      dispatch(getUserRooms());
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      try {
        dispatch(getUserRooms());
      } catch {}
    }, [])
  );

  useEffect(() => {
    console.log(rooms?.[0]?._id);
  }, [rooms]);
  function formatTimestamp(timestamp) {
    const currentDate = new Date();
    const providedDate = new Date(timestamp);

    // Check if the provided date is today
    if (
      providedDate.getDate() === currentDate.getDate() &&
      providedDate.getMonth() === currentDate.getMonth() &&
      providedDate.getFullYear() === currentDate.getFullYear()
    ) {
      const hours = providedDate.getHours();
      const minutes = providedDate.getMinutes();
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    // Check if the provided date is yesterday
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    if (
      providedDate.getDate() === yesterday.getDate() &&
      providedDate.getMonth() === yesterday.getMonth() &&
      providedDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    // Display the date in "dd/mm/yyyy" format
    const dd = String(providedDate.getDate()).padStart(2, "0");
    const mm = String(providedDate.getMonth() + 1).padStart(2, "0");
    const yyyy = providedDate.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {rooms &&
          rooms.map((item, index) => (
            <>
              <List.Item
                key={item._id}
                id={item._id}
                titleStyle={{ color: "red" }}
                title={() => (
                  <Text style={{ paddingBottom: 5 }} variant='titleMedium'>
                    {item.title}
                  </Text>
                )}
                right={() => (
                  <Text variant='bodySmall'>
                    {formatTimestamp(item.lastMessage?.createdAt)}
                  </Text>
                )}
                description={() => {
                  if (item.lastMessage?.sender) {
                    return (
                      <Text variant='bodySmall'>
                        {item.lastMessage?.sender?.split(" ")[0] +
                          ": " +
                          item.lastMessage?.message}
                      </Text>
                    );
                  }
                }}
                onPress={() => {
                  try {
                    dispatch(getRoom({ room: item._id }));
                  } catch {
                    return;
                  }
                  navigation.navigate("ChatsScreen", {
                    room: item._id,
                    title: item.title,
                  });
                }}
                left={() => (
                  <Avatar.Image source={{ uri: item.avatar }} size={55} />
                )}
              />
              {index < rooms.length - 1 && <Divider />}
            </>
          ))}
      </ScrollView>
      <FAB style={styles.fab} icon='plus' onPress={showModal} />
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <TextInput
            label='Room Name'
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
            style={styles.input}
          />
          <TextInput
            label='Room Description'
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          />
          <Button
            mode='contained'
            onPress={addNewRoom}
            style={styles.addButton}
          >
            Add Room
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
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
    borderRadius: 8,
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
  },
});

export default ChatRoomList;
