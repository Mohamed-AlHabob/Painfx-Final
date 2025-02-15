import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalStore } from "@/core/store";
import { Avatar } from "@/components/ui/avatar";
import { Message } from "@/core/types";
import { useNetworkStatus } from "@/core/utils/network";
import { cacheData, getCachedData } from "@/core/utils/cache";
import icons from "@/constants/icons";
import { Input } from "@/components/global/Input";

const ChatPage: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sanitizedId = id?.replace(/[^a-zA-Z0-9-_]/g, ""); // Sanitize the ID
  const router = useRouter();
  const {
    user,
    messagesList,
    messagesNext,
    messagesTyping,
    messageList,
    messageSend,
    socketConnect,
  } = useGlobalStore();
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    let isMounted = true;

    const fetchCachedMessages = async () => {
      if (!isOnline && isMounted) {
        const cachedMessages = await getCachedData(`chat_${sanitizedId}`);
        if (cachedMessages) {
          useGlobalStore.setState({ messagesList: cachedMessages });
        }
      }
    };

    fetchCachedMessages();

    return () => {
      isMounted = false;
    };
  }, [sanitizedId, isOnline]);

  useEffect(() => {
    if (isOnline) {
      socketConnect();
      if (sanitizedId) {
        messageList(sanitizedId);
      }
    }
  }, [sanitizedId, isOnline, socketConnect, messageList]);

  useEffect(() => {
    if (messagesList.length > 0) {
      cacheData(`chat_${sanitizedId}`, messagesList);
    }
  }, [sanitizedId, messagesList]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !sanitizedId) return;

    const newMessage: Message = {
      id: `temp_${Date.now()}`,
      text: text.trim(),
      user: user!,
      created_at: new Date().toISOString(),
      status: "pending",
      is_me: false,
      unread: false,
    };

    try {
      setIsSending(true);

      if (isOnline) {
        await messageSend(sanitizedId, text.trim());
        useGlobalStore.setState((state) => ({
          messagesList: state.messagesList.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
          ),
        }));
      } else {
        useGlobalStore.setState((state) => ({
          messagesList: [newMessage, ...state.messagesList],
        }));
      }
    } catch (err) {
      console.error("Error sending message:", err);
      useGlobalStore.setState((state) => ({
        messagesList: state.messagesList.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "failed" } : msg
        ),
      }));
    } finally {
      setIsSending(false);
    }
  };

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => (
      <View
        className={`bg-white rounded-2xl shadow-sm px-4 py-2 my-1 max-w-[80%] overflow-hidden ${
          item.user.id === user?.id ? "bg-primary-500 self-end" : "bg-gray-100 self-start"
        }`}
      >
        <Text className={`text-sm ${item.user.id === user?.id ? "text-dark" : "text-gray-800"}`}>{item.text}</Text>
        <Text className={`text-xs mt-1 ${item.user.id === user?.id ? "text-gray-400" : "text-gray-500"}`}>
          {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
        </Text>
        {item.status === "pending" && (
          <View className="px-2 py-1 flex-row items-center justify-between border-t border-gray-100 mt-3">
            <Pressable accessibilityRole="button" accessibilityLabel="Message info">
              <Image source={icons.info} className="size-3" />
            </Pressable>
          </View>
        )}
      </View>
    ),
    [user?.id],
  );

  const renderHeader = () => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200 bg-white">
      <Pressable
        onPress={() => router.back()}
        className="p-2"
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </Pressable>
      <View className="flex-row items-center">
        <Avatar src={user?.profile.avatar} fallback={user?.first_name.charAt(0) || "N"} size="md" />
        <View className="ml-3">
          <Text className="font-bold text-lg text-gray-900">
            {user?.first_name} {user?.last_name}
          </Text>
          {messagesTyping && <Text className="text-sm text-gray-500">Typing...</Text>}
        </View>
      </View>
      <Pressable className="p-2" accessibilityRole="button" accessibilityLabel="More options">
        <Ionicons name="ellipsis-vertical" size={24} color="#374151" />
      </Pressable>
    </View>
  );

  const uniqueMessages = useMemo(
    () =>
      messagesList.filter(
        (message, index, self) =>
          index === self.findIndex((t) => t.id === message.id)
      ),
    [messagesList]
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      {renderHeader()}
      <FlatList
        ref={flatListRef}
        data={uniqueMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        onEndReached={() => {
          if (messagesNext) {
            messageList(sanitizedId, messagesNext);
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={messagesNext ? <ActivityIndicator size="small" color="#6366F1" /> : null}
      />
      <View className=" mt-20" />
      <Input onSubmit={handleSendMessage} isSubmitting={isSending} placeholder={`Type to ${user?.first_name} ${user?.last_name} a message...` || "Type a message..."} />
      {!isOnline && (
        <View className="absolute top-0 left-0 right-0 p-2 bg-yellow-500">
          <Text className="text-center text-white">You are offline. Messages will be sent when you're back online.</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatPage;