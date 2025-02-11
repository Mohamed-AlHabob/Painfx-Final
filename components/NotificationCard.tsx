import { View, Text, Pressable, Image } from "react-native"
import { formatDistanceToNow } from "date-fns"
import icons from "@/constants/icons"
import { Avatar } from "./ui/avatar"

interface NotificationCardProps {
  item: {
    id: string
    user: {
      id: string
      first_name: string
      last_name: string
      profile: {
        avatar: string
      }
    }
    message: string
    is_read: boolean
    created_at: string
  }
}

const NotificationCard = ({ item }: NotificationCardProps) => {

  return (
    <Pressable
      className={`bg-white rounded-2xl shadow-sm mt-4 mx-4 overflow-hidden ${item.is_read ? "opacity-50" : ""}`}
    >
      <View className="flex-row items-center p-4">
        <View className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
        <Avatar
        src={item.user.profile.avatar}
        fallback={item.user.first_name.charAt(0) || ""}
        size="lg"
        />
        </View>
        <View className="ml-3 flex-1">
          <View className="flex-row items-center flex-wrap">
            <Text className="font-semibold text-gray-900">
              {item.user.first_name} {item.user.last_name}
            </Text>
          </View>
          <Text className="text-gray-600 text-sm mt-1" numberOfLines={2}>
            {item.message}
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
          </Text>
        </View>
        {!item.is_read && <View className="h-3 w-3 rounded-full bg-primary-500 ml-2" />}
      </View>
      <View className="px-4 py-3 flex-row items-center justify-between border-t border-gray-100">
        <Pressable className="flex-row items-center">
          <Image source={icons.chat} className="size-5" />
          <Text className="ml-2 text-gray-600 text-sm">Mark as Read</Text>
        </Pressable>
        <Pressable>
          <Image source={icons.info} className="size-5" />
        </Pressable>
      </View>
    </Pressable>
  )
}

export default NotificationCard

