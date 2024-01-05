import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { io } from "socket.io-client";
import {
  Avatar,
  Button,
  Card,
  Title,
  Text,
  IconButton,
  Icon,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const socket = io("http://localhost:3000");

const ChatsScreen = () => {
  socket.on("connect", () => {
    console.log("hi");
  });

  socket.emit("send-message", message, room);

  socket.on("receive-message", (message) => {
    console.log(message);
  });

  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there!", sender: "user" },
    { id: 2, text: "Hello!", sender: "other" },
    // Add more demo data as needed
  ]);
  const renderMessages = () => {
    return messages.map((message) => {
      const alignRight = message.sender === "user";
      return (
        <View
          key={message.id}
          style={{
            alignItems: alignRight ? "flex-end" : "flex-start",
            margin: 5,
          }}
        >
          {!alignRight && (
            <Text style={{ marginLeft: 3 }} variant='labelSmall'>
              {message.sender}
            </Text>
          )}
          <Card
            style={{
              padding: 10,
              maxWidth: "80%",
              backgroundColor: alignRight ? "#DCF8C6" : "#EAEAEA",
            }}
          >
            <Text>{message.text}</Text>
          </Card>
        </View>
      );
    });
  };

  const sendMessage = () => {
    // Logic to send message
    // For demo purposes, let's just add a new message with the user as sender
    const newMessage = {
      id: messages.length + 1,
      text: "New message",
      sender: "user",
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 0.5,
        }}
      >
        <Avatar.Image
          size={40}
          source={() => <Icon name='camera' size={20} color='white' />}
        />
        <Title style={{ marginLeft: 10 }}>Group Name</Title>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {renderMessages()}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          gap: 5,
        }}
      >
        <TextInput
          mode='outlined'
          placeholder='Type your message...'
          outlineStyle={{ borderRadius: 40 }}
          style={{
            flex: 1,
            backgroundColor: "",
          }}
          dense
          right={
            <TextInput.Icon
              icon='camera'
              onPress={() => console.log("Camera button pressed")}
            />
          }
        />

        <Button mode='elevated' icon='send' onPress={sendMessage}>
          Send
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;
