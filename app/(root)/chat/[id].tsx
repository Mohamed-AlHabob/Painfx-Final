"use client"

import { useEffect, useState, useRef } from "react"
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { formatDistanceToNow } from "date-fns"
import { Ionicons } from "@expo/vector-icons"
import { useGlobalStore } from "@/core/store"

interface Message {
  id: string
  text: string
  user: {
      id: string
      frist_name: string
      last_name: string
      username: string;
      profile: {
        avatar: string
      }
    }
  created_at: string
}

const ChatPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const {
    user,
    messagesList,
    messagesNext,
    messagesTyping,
    messagesUsername,
    messageList,
    messageSend,
    messageType,
    socketConnect,
  } = useGlobalStore()
  const [inputMessage, setInputMessage] = useState("")
  const flatListRef = useRef<FlatList>(null)

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

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`p-3 rounded-lg my-1 max-w-[80%] ${item.user === user?.username ? "bg-primary-100 self-end" : "bg-gray-100 self-start"}`}
    >
      <Text className="text-gray-800">{item.text}</Text>
      <Text className="text-xs text-gray-500 mt-1">
        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
      </Text>
    </View>
  )

  const renderHeader = () => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <Pressable onPress={() => router.back()} className="p-2">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <View className="flex-row items-center">
      {user?.profile.avatar ? (
            <Image source={{ uri: user?.profile.avatar }} className="w-10 h-10 rounded-full mr-3" />
          ) : (
            <View className="w-10 h-10 rounded-full mr-3 bg-primary-100 items-center justify-center">
              <Text className="text-primary-600 text-lg font-semibold">{user?.first_name.charAt(0) || "N"}</Text>
            </View>
           )}
        <View>
          <Text className="font-bold text-lg">{messagesUsername}</Text>
          {messagesTyping && <Text className="text-sm text-gray-500">Typing...</Text>}
        </View>
      </View>
      <View className="w-10" />
    </View>
  )

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-white">
      {renderHeader()}
      <FlatList
        ref={flatListRef}
        data={messagesList}
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
        ListFooterComponent={messagesNext ? <ActivityIndicator size="small" color="#0000ff" /> : null}
      />
      <View className="p-4 border-t border-gray-200">
        <View className="flex-row items-center">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
            value={inputMessage}
            onChangeText={(text) => {
              setInputMessage(text)
              if (messagesUsername) {
                messageType(messagesUsername)
              }
            }}
            placeholder="Type a message..."
          />
          <Pressable onPress={handleSendMessage} className="bg-primary-500 rounded-full p-3">
            <Ionicons name="send" size={24}  />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatPage

