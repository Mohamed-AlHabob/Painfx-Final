import { View, Text, Pressable,Image } from "react-native"
import icons from "@/constants/icons";
import { formatDistanceToNow } from "date-fns"
import { Link, router } from "expo-router"
import MediaGrid from "./MediaAttachment"
import { Avatar } from "../ui/avatar";

interface PostCardProps {
  item: {
    id: string
    title: string
    content: string
    doctor: {
      id: string
      user:{
        id: string,
        first_name: string
        last_name: string
        profile:{
          avatar: string
        }
      }
      
      specialization: {
        name:string
      }
    }
    media_attachments: Array<{
      id: string
      file: string
      media_type: "image" | "video"
    }>
    likes_count: number
    comments_count: number
    view_count:number
    created_at: string
  }
  onPress?: (id: string) => void
}

const PostCard = ({ item }: PostCardProps) => {

  const handleProfilePress = () => {
    router.push(`/(root)/(tabs)/profile/${item.doctor.id}`)
  }

  return (
    <View className="bg-white rounded-2xl shadow-sm mt-4 mx-4 overflow-hidden">
      <Pressable 
        onPress={handleProfilePress}
        className="flex-row items-center p-4"
      >
        <Avatar
        src={item.doctor.user.profile.avatar}
        fallback={item.doctor.user.first_name.charAt(0) || "N"}
        size="md"
        />
        <View className="ml-3 flex-1">
        <View className="flex-row items-center flex-wrap">
            <Text className="font-semibold text-gray-900">
            {item.doctor.user.first_name || ""} {item.doctor.user.last_name || ""}
            </Text>
            <Text className="text-gray-500 text-sm ml-2">
              • {item.doctor.specialization?.name || "General"}
            </Text>
          </View>
          <Text className="text-gray-500 text-xs">
            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
          </Text>
        </View>
      </Pressable>

      <Link href={`/(root)/post/${item.id}`}>
      <View className="px-4 pb-3">
        {item.title && (
          <Text className="text-gray-900 font-medium mb-2">{item.title}</Text>
        )}
        {item.content && (
          <Text 
            numberOfLines={3} 
            className="text-gray-600 text-sm leading-5"
          >
            {item.content}
          </Text>
        )}
      </View>
      </Link>

      {item.media_attachments && item.media_attachments.length > 0 && (
              <MediaGrid 
                attachments={item.media_attachments}
              />
            )}

<View className="px-4 py-3 flex-row items-center justify-between border-t border-gray-100 mt-3">
        <View className="flex-row items-center space-x-6 gap-4">
          <Pressable className="flex-row items-center">
          <Image source={icons.people} className="size-5" />
              <Text className="ml-2 text-gray-600 text-sm">{item.likes_count || 0}</Text>
          </Pressable>
          <Pressable className="flex-row items-center">
          <Image source={icons.send} className="size-5" />
              <Text className="ml-2 text-gray-600 text-sm">{item.view_count || 0}</Text>
          </Pressable>
          <Pressable className="flex-row items-center">
          <Image source={icons.chat} className="size-5" />
              <Text className="ml-2 text-gray-600 text-sm">{item.comments_count || 0}</Text>
          </Pressable>
        </View>
        <Pressable>
        <Image source={icons.info} className="size-5" />
        </Pressable>
      </View>
    </View>
  )
}

export default PostCard