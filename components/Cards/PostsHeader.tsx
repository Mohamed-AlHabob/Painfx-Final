import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { router } from "expo-router"

interface PostsHeaderProps {
  user: {
    avatar?: string
  }
}

const PostsHeader: React.FC<PostsHeaderProps> = ({ user }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
      <View className="flex-row items-center">
        <Image
          source={{
            uri: user?.avatar || "https://via.placeholder.com/40",
          }}
          className="w-8 h-8 rounded-full mr-2"
        />
        <Text className="text-lg font-rubik-medium text-black-300">Posts</Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/(root)/(modals)/NewPost")}>
        <Feather name="edit" size={24} color="#4A90E2" />
      </TouchableOpacity>
    </View>
  )
}

export default PostsHeader

