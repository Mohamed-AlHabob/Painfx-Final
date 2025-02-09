import { View, Text, Pressable, Image } from "react-native"
import { formatDistanceToNow } from "date-fns"
import { router } from "expo-router"
import icons from "@/constants/icons"
import MediaGrid from "./MediaAttachment"

interface CommentCardProps {
  comment: {
    id: string
    text: string
    user: {
      id: string
      first_name: string
      last_name: string
      profile: {
        avatar: string
      }
    }
    media_attachments?: Array<{
      id: string
      file: string
      media_type: "image" | "video"
    }>
    replies: CommentCardProps["comment"][]
    created_at: string
  }
  isReply?: boolean
}

const CommentCard = ({ comment, isReply = false }: CommentCardProps) => {
  const handleProfilePress = () => {
    router.push(`/(root)/(tabs)/profile/${comment.user.id}`)
  }

  return (
    <View className={`${isReply ? "ml-12" : ""}`}>
      <View className="flex-row p-4">
        {/* User Avatar */}
        <Pressable onPress={handleProfilePress}>
          <View className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
            {comment.user.profile.avatar ? (
              <Image source={{ uri: comment.user.profile.avatar }} className="h-full w-full" resizeMode="cover" />
            ) : (
              <View className="h-full w-full bg-primary-100 items-center justify-center">
                <Text className="text-primary-600 text-sm font-semibold">{comment.user.first_name.charAt(0)}</Text>
              </View>
            )}
          </View>
        </Pressable>

        {/* Comment Content */}
        <View className="flex-1 ml-3">
          <View className="flex-row items-center flex-wrap">
            <Text className="font-semibold text-gray-900">
              {comment.user.first_name} {comment.user.last_name}
            </Text>
            <Text className="text-gray-500 text-xs ml-2">
              • {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </Text>
          </View>

          <Text className="text-gray-600 text-sm mt-1">{comment.text}</Text>

          {/* Media Attachments */}
          {comment.media_attachments && comment.media_attachments.length > 0 && (
            <View className="mt-2">
              <MediaGrid attachments={comment.media_attachments} />
            </View>
          )}

          {/* Comment Actions */}
          <View className="flex-row items-center mt-2 space-x-4">
            <Pressable className="flex-row items-center">
              <Image source={icons.chat} className="size-4" />
              <Text className="ml-2 text-gray-500 text-xs">Reply</Text>
            </Pressable>
            <Pressable className="flex-row items-center">
              <Image source={icons.heart} className="size-4" />
              <Text className="ml-2 text-gray-500 text-xs">Like</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <View className="border-l border-gray-100 ml-8">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </View>
      )}
    </View>
  )
}

export default CommentCard

