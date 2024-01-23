import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";

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
import { socket } from "../../../socket/socket.config";
import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../../store/user";
import theme from "../../../theme";

const ChatsScreen = ({ route }) => {
  const { room, title } = route.params; // Accessing passed props
  const user = useSelector((state) => state.user.user.user);
  const chat = useSelector((state) => state.user.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();
    socket.emit("join-room", room);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.on("receive-message", (message, sender) => {
      console.log(message);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, message: message, sender: sender },
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    try {
      dispatch(getRoom({ room: room }));
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    console.log(chat);
    if (chat?.chat) {
      setMessages(chat.chat);
    }
  }, [chat]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const [messages, setMessages] = useState([]);
  const renderMessages = (messages) => {
    return messages.map((message, index) => {
      const alignRight =
        message.sender === user.firstName + " " + user.lastName;
      return (
        <View
          key={index}
          style={{
            alignItems: alignRight ? "flex-end" : "flex-start",
            margin: 5,
            marginBottom: 15,
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
              backgroundColor: alignRight
                ? theme.colors.tertiary
                : theme.colors.secondary,
            }}
          >
            <Text style={{ color: "white" }}>{message.message}</Text>
          </Card>
        </View>
      );
    });
  };

  const sendMessage = () => {
    if (inputValue == "") {
      return;
    }
    // Logic to send message
    // For demo purposes, let's just add a new message with the user as sender
    const newMessage = {
      id: Date.now(),
      message: inputValue,
      sender: user.firstName + " " + user.lastName,
    };
    setMessages([...messages, newMessage]);
    socket.emit(
      "send-message",
      inputValue,
      room,
      user.firstName + " " + user.lastName
    );
    setInputValue("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 0.5,
          backgroundColor: theme.colors.primary,
        }}
      >
        <Avatar.Image
          size={40}
          source={() => <Icon name='camera' size={20} color='white' />}
        />
        <Text variant='titleLarge' style={{ marginLeft: 10, color: "white" }}>
          {title}
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        {renderMessages(messages)}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          gap: 5,
          backgroundColor: theme.colors.primary,
        }}
      >
        <TextInput
          mode='outlined'
          placeholder='Type your message...'
          outlineStyle={{ borderRadius: 50, borderWidth: 0 }}
          style={{
            flex: 1,
            backgroundColor: theme.colors.primaryContainer,
          }}
          value={inputValue}
          onChangeText={(text) => handleInputChange(text)}
          dense
          right={
            <TextInput.Icon
              icon='send'
              color={theme.colors.secondary}
              onPress={sendMessage}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;
