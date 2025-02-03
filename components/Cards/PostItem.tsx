import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Feather, AntDesign } from "@expo/vector-icons"
import { formatDistanceToNow } from "date-fns"

interface PostItemProps {
  item: any // Replace 'any' with a proper type definition for your post
  onPress: (id: string) => void
  onLikePress: (id: string) => void
  onCommentPress: (id: string) => void
  onSharePress: (id: string) => void
}

const PostItem: React.FC<PostItemProps> = ({ item, onPress, onLikePress, onCommentPress, onSharePress }) => {
  console.log(item)
  return (
    <TouchableOpacity onPress={() => onPress(item.id)} className="p-4 border-b border-gray-200">
      <View className="flex-row">
        <Image
          source={{ uri: item.doctor.user.avatar || "https://via.placeholder.com/40" }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-rubik-medium text-black-300">
              {item.doctor.user.first_name} {item.doctor.user.last_name}
            </Text>
            <Text className="text-xs font-rubik text-black-100">
              {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
            </Text>
          </View>
          <Text className="font-rubik text-black-300 mb-2">{item.title}</Text>
          <Text className="font-rubik text-black-100 mb-3" numberOfLines={3}>
            {item.content}
          </Text>
          {item.media_attachments.length > 0 && (
            <Image
              source={{ uri: item.media_attachments[0].file }}
              className="w-full h-48 rounded-md mb-3"
              resizeMode="cover"
            />
          )}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => onLikePress(item.id)} className="mr-4 flex-row items-center">
                <AntDesign name="heart" size={16} color="#FF6B6B" />
                <Text className="ml-1 text-black-100">{item.likes_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onCommentPress(item.id)} className="mr-4 flex-row items-center">
                <Feather name="message-circle" size={16} color="#4A90E2" />
                <Text className="ml-1 text-black-100">{item.comments_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <Feather name="eye" size={16} color="#4A90E2" />
                <Text className="ml-1 text-black-100">{item.view_count}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => onSharePress(item.id)}>
              <Feather name="share-2" size={16} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PostItem

