import React from "react"
import { View, Text, Pressable, Image } from "react-native"
import { formatDistanceToNow } from "date-fns"
import { router } from "expo-router"
import { FriendSerializer } from "@/types/api"
import { Avatar } from "@/components/ui/avatar"
import { Ionicons } from "@expo/vector-icons"

interface ChatCardProps {
  item: FriendSerializer
}

export const ChatCard: React.FC<ChatCardProps> = ({ item }) => {
  const { id, friend, preview, updated_at } = item
  const { first_name, last_name, profile } = friend

  return (
    <Pressable
      className="flex-row bg-white rounded-2xl shadow-sm  items-center px-4 py-3 mt-2 overflow-hidden"
      onPress={() => router.push(`/(root)/chat/${id}`)}
    >
      <Avatar
        src={profile.avatar}
        fallback={first_name.charAt(0) || "N"}
        size="lg"
        className="mr-3"
      />
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-base text-gray-900">
            {first_name} {last_name}
          </Text>
          <Text className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(updated_at), { addSuffix: true })}
          </Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Text className="text-sm text-gray-600 flex-1" numberOfLines={1}>
            {preview}
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </View>
      </View>
    </Pressable>
  )
}
