import * as React from "react";
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

const chatRoomsData = [
  { id: "1", name: "Room 1", lastMessage: "Hey there!", avatar: "R1" },
  { id: "2", name: "Room 2", lastMessage: "What's up?", avatar: "R2" },
  // Add more chat room data here
  // { id: '3', name: 'Room 3', lastMessage: 'Sample message', avatar: 'R3' },
  // ...
];

const ChatRoomList = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const addNewRoom = () => {
    // Implement logic to add a new room with roomName and message
    // For example: Create an API call or add it to the chatRoomsData array
    hideModal(); // Hide the modal after adding the room
  };

  const renderChatRoom = ({ item, index }) => (
    <>
      <List.Item
        title={item.name}
        description={item.lastMessage}
        left={() => <Avatar.Text size={40} label={item.avatar} />}
      />
      {index < chatRoomsData.length - 1 && <Divider />}
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRoomsData}
        renderItem={renderChatRoom}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Divider />}
      />
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
            label='Message'
            value={message}
            onChangeText={(text) => setMessage(text)}
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
