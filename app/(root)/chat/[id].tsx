import React, { useEffect, useState } from "react";
import { FlatList, InputAccessoryView, Text, Platform, SafeAreaView, View } from "react-native";
import { useGlobalStore } from "@/core/store";
import { useLocalSearchParams } from "expo-router";
import MessageBubble from "@/components/chat/MessageBubble";
import MessageInput from "@/components/chat/MessageInput";

type Friend = {
  name: string;
  thumbnail: string;
  username: string;
};

const MessagesScreen = ({ route }: { route: { params: { id: string, friend: Friend } } }) => {
  const [message, setMessage] = useState("");
  const messagesList = useGlobalStore(state => state.messagesList);
  const messagesNext = useGlobalStore(state => state.messagesNext);
  const messageList = useGlobalStore(state => state.messageList);
  const messageSend = useGlobalStore(state => state.messageSend);
  const messageType = useGlobalStore(state => state.messageType);
  const { id } = useLocalSearchParams<{ id?: string }>();

  const connectionId = id;

  const friend = {
    name: "Mohamed",
    thumbnail: "https://as2.ftcdn.net/v2/jpg/07/23/14/93/1000_F_723149335_tA0Fo8zefrHzYlSgXRMYHmBQk7CuWrRd.jpg",
    username: "test",
  };

  useEffect(() => {
    if (connectionId) {
      messageList(connectionId);
    }
  }, [connectionId, messageList]);

  const onSend = () => {
    const cleaned = message.replace(/\s+/g, " ").trim();
    if (cleaned.length === 0) return;
    messageSend(connectionId, cleaned);
    setMessage("");
  };

  const onType = (value: string) => {
    setMessage(value);
    messageType(friend.username || "test");
  };

  if (!friend) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No friend found!</Text>
      </SafeAreaView>
    );
  }

  const inputAccessory = Platform.OS === "ios" ? (
    <InputAccessoryView>
      <MessageInput message={message} setMessage={onType} onSend={onSend} />
    </InputAccessoryView>
  ) : (
    <MessageInput message={message} setMessage={onType} onSend={onSend} />
  );
  console.log("MessagesList IDs:", messagesList.map(item => item.id));

  return (
<>
      <View style={{ flex: 1, marginBottom: Platform.OS === "ios" ? 60 : 0 }}>
        <FlatList
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ paddingTop: 30 }}
          data={[{ id: -1 }, ...messagesList]}
          inverted
          keyExtractor={(item, index) => `${item.id}-${index}`} 
          onEndReached={() => {
            if (messagesNext) {
              messageList(connectionId, messagesNext);
            }
          }}
          renderItem={({ item, index }) => (
            <MessageBubble index={index} message={item} friend={friend} />
          )}
        />
      </View>

      {inputAccessory}
      </>
  );
};

export default MessagesScreen;
