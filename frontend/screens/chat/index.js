import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { List, Avatar, TextInput, Button } from "react-native-paper";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey there!", from: "other" },
    { id: "2", text: "Hello?", from: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: String(messages.length + 1),
      text: newMessage,
      from: "me",
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.text}
            style={{
              alignItems: item.from === "me" ? "flex-end" : "flex-start",
            }}
            left={(props) =>
              item.from === "other" ? (
                <Avatar.Text {...props} label='O' />
              ) : null
            }
            right={(props) =>
              item.from === "me" ? <Avatar.Text {...props} label='M' /> : null
            }
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          label='Type a message'
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          style={{ flex: 1, marginRight: 10 }}
        />
        <Button mode='contained' onPress={sendMessage}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default ChatScreen;
