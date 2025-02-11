import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { formatDistanceToNow } from "date-fns"
import { Ionicons } from "@expo/vector-icons"
import { useGlobalStore } from "@/core/store"
import { Avatar } from "@/components/ui/avatar"

interface Message {
  id: string
  text: string
  user: {
    id: string
    first_name: string
    last_name: string
  }
  created_at: string
}

const ChatPage: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const {
    user,
    messagesList,
    messagesNext,
    messagesTyping,
    messagesFriendId,
    messageList,
    messageSend,
    messageType,
    socketConnect,
  } = useGlobalStore()
  const [inputMessage, setInputMessage] = useState("")
  const flatListRef = useRef<FlatList<Message>>(null)

  useEffect(() => {
    socketConnect()
    if (id) {
      messageList(id)
    }
    return () => {
      // Clean up or reset chat state if needed
    }
  }, [id, socketConnect, messageList])

  const handleSendMessage = () => {
    if (inputMessage.trim() && id) {
      messageSend(id, inputMessage.trim())
      setInputMessage("")
    }
  }

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => (
      <View
        className={`px-4 py-2 my-1 max-w-[80%] rounded-2xl ${
          item.user.id === user?.id ? "bg-primary-500 self-end" : "bg-gray-100 self-start"
        }`}
      >
        <Text className={`text-sm ${item.user.id === user?.id ? "text-dark" : "text-gray-800"}`}>{item.text}</Text>
        <Text className={`text-xs mt-1 ${item.user.id === user?.id ? "text-gray-400" : "text-red-500"}`}>
          {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
        </Text>
      </View>
    ),
    [user?.id],
  )

  const renderHeader = () => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200 bg-white">
      <Pressable onPress={() => router.back()} className="p-2">
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
      <Pressable className="p-2">
        <Ionicons name="ellipsis-vertical" size={24} color="#374151" />
      </Pressable>
    </View>
  )
  const uniqueMessages = messagesList.filter(
    (message, index, self) => index === self.findIndex((t) => t.id === message.id),
  )

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
              messageList(id, messagesNext)
            }
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={messagesNext ? <ActivityIndicator size="small" color="#6366F1" /> : null}
        />
        <View className="p-4 border-t border-gray-200 bg-white">
          <View className="flex-row items-center">
            <Pressable className="mr-3">
              <Ionicons name="add-circle-outline" size={24} color="#6366F1" />
            </Pressable>
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
              value={inputMessage}
              onChangeText={(text) => {
                setInputMessage(text)
                if (messagesFriendId) {
                  messageType(messagesFriendId)
                }
              }}
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
            />
            <Pressable onPress={handleSendMessage} disabled={!inputMessage.trim()}>
              <Ionicons name="send" size={24} color={inputMessage.trim() ? "#6366F1" : "#D1D5DB"} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
  )
}

export default ChatPage

