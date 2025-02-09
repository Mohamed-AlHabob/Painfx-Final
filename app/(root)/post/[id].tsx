import { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useLocalSearchParams } from "expo-router"
import { Image } from "expo-image"
import icons from "@/constants/icons"
import PostCard from "@/components/post/PostItem"
import CommentCard from "@/components/post/CommentCard"
import api from "@/core/api"
import { ENDPOINTS } from "@/core/config"

interface Comment {
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
  replies: Comment[]
  created_at: string
}

interface Post {
  id: string
  title: string
  content: string
  doctor: {
    id: string
    user: {
      id: string
      first_name: string
      last_name: string
      profile: {
        avatar: string
      }
    }
    specialization: {
      name: string
    }
  }
  media_attachments: Array<{
    id: string
    file: string
    media_type: "image" | "video"
  }>
  likes_count: number
  comments_count: number
  comments: Comment[]
  view_count: number
  created_at: string
}

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCommenting, setIsCommenting] = useState(false)
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    fetchPostDetails()
  }, [id])

  const fetchPostDetails = useCallback(async () => {
    if (!id) return

    try {
      setIsLoading(true)
      const response = await api.get(`${ENDPOINTS.POSTS}${id}`)

      if (response.data && response.data.results) {
        setPost(response.data.results)
      } else {
        setPost(null)
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      setPost(null)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (!post) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Post not found</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <PostCard item={post} />
        <View className="bg-white mt-4 p-4">
          <Text className="text-lg font-semibold mb-4">Comments ({post.comments_count})</Text>

          {post.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row items-center space-x-4">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2"
            placeholder="Write a comment..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={1000}
          />
          <Pressable
            // onPress={handleSubmitComment}
            disabled={isCommenting || !commentText.trim()}
            className={`rounded-full p-2 ${isCommenting || !commentText.trim() ? "bg-gray-200" : "bg-primary-600"}`}
          >
            {isCommenting ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Image source={icons.send} className="size-6" tintColor="#ffffff" />
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

