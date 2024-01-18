import { useCallback, useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  List,
  Avatar,
  Divider,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
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

  const renderChatRoom = ({ item, index }) => (
    <>
      <List.Item
        id={item._id}
        title={item.title}
        description={item.lastMessage.message}
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
        left={() => <Avatar.Image source={{ uri: item.avatar }} size={50} />}
      />
      {index < rooms.length - 1 && <Divider />}
    </>
  );

  return (
    <View style={styles.container}>
      {rooms && (
        <FlatList
          data={rooms}
          renderItem={renderChatRoom}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <Divider />}
        />
      )}
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
    paddingHorizontal: 20,
  },
  listContent: {
    paddingVertical: 8,
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
