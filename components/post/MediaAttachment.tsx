import React from "react"
import { View, Pressable, Text } from "react-native"
import { Image as ExpoImage } from "expo-image"
import { Video } from "expo-av"
import { Play } from "phosphor-react-native"

interface MediaAttachment {
  id: string
  file: string
  media_type: "image" | "video"
}

interface MediaGridProps {
  attachments: MediaAttachment[]
  onPress?: () => void
}

const MediaItem = ({ attachment }: { attachment: MediaAttachment }) => {
  if (attachment.media_type === "video") {
    return (
      <View className="relative h-full w-full bg-gray-100">
        <Video
          source={{ uri: attachment.file }}
          resizeMode="cover"
          className="h-full w-full"
          shouldPlay={false}
        />
        <View className="absolute inset-0 items-center justify-center">
          <View className="bg-black/50 rounded-full p-2">
            <Play size={24} color="#FFFFFF" weight="fill" />
          </View>
        </View>
      </View>
    )
  }

  return (
    <ExpoImage
      source={{ uri: attachment.file }}
      className="h-full w-full"
      contentFit="cover"
    />
  )
}

const MediaGrid = ({ attachments, onPress }: MediaGridProps) => {
  if (!attachments || attachments.length === 0) return null

  // Single media item
  if (attachments.length === 1) {
    return (
      <Pressable onPress={onPress}>
        <View className="aspect-[4/3] w-full bg-gray-100">
          <MediaItem attachment={attachments[0]} />
        </View>
      </Pressable>
    )
  }

  // Two media items
  if (attachments.length === 2) {
    return (
      <Pressable onPress={onPress} className="flex-row h-64">
        <View className="flex-1 mr-1">
          <MediaItem attachment={attachments[0]} />
        </View>
        <View className="flex-1 ml-1">
          <MediaItem attachment={attachments[1]} />
        </View>
      </Pressable>
    )
  }

  // Three media items
  if (attachments.length === 3) {
    return (
      <Pressable onPress={onPress} className="h-80">
        <View className="flex-1 mb-2">
          <MediaItem attachment={attachments[0]} />
        </View>
        <View className="flex-row h-40">
          <View className="flex-1 mr-1">
            <MediaItem attachment={attachments[1]} />
          </View>
          <View className="flex-1 ml-1">
            <MediaItem attachment={attachments[2]} />
          </View>
        </View>
      </Pressable>
    )
  }

  // Four or more media items
  return (
    <Pressable onPress={onPress} className="h-80">
      <View className="flex-row flex-1 mb-2">
        <View className="flex-1 mr-1">
          <MediaItem attachment={attachments[0]} />
        </View>
        <View className="flex-1 ml-1">
          <MediaItem attachment={attachments[1]} />
        </View>
      </View>
      <View className="flex-row h-40">
        <View className="flex-1 mr-1 relative">
          <MediaItem attachment={attachments[2]} />
        </View>
        <View className="flex-1 ml-1 relative">
          <MediaItem attachment={attachments[3]} />
          {attachments.length > 4 && (
            <View className="absolute inset-0 bg-black/60 items-center justify-center">
              <Text className="text-white text-xl font-semibold">
                +{attachments.length - 4}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  )
}

export default MediaGrid