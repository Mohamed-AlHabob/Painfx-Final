import { View, Text, Pressable, Image } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { router } from "expo-router";
import MediaGrid from "./MediaAttachment";
import { Avatar } from "../ui/avatar";
import { useState } from "react";
import { incrementPostViewCount, likePost, unlikePost } from "@/core/api";
import { Skeleton } from "../global/skeleton";
import { About, Bell, Chat, Like, Message, Unlike } from "@/constants/icons";

interface PostCardProps {
  item: {
    id: string;
    title: string;
    content: string;
    doctor: {
      id: string;
      user: {
        id: string;
        first_name: string;
        last_name: string;
        profile: {
          avatar: string;
        };
      };
      specialization: {
        name: string;
      };
    };
    media_attachments: Array<{
      id: string;
      file: string;
      media_type: "image" | "video";
    }>;
    likes_count: number;
    comments_count: number;
    view_count: number;
    created_at: string;
    is_liked: boolean;
  };
}

export const PostCard = ({ item }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(item.is_liked);
  const [likesCount, setLikesCount] = useState(item.likes_count);
  const [likeId, setLikeId] = useState<string | null>(null);

  const handleProfilePress = () => {
    router.push(`/(root)/profile/${item.doctor.id}`);
  };

  const handleLikePress = async () => {
    try {
      if (isLiked) {
        if (likeId) {
          await unlikePost(likeId);
          setLikesCount((prev) => prev - 1);
          setLikeId(null);
        }
      } else {
        const response = await likePost(item.id);
        setLikesCount((prev) => prev + 1);
        setLikeId(response.id);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentPress = () => {
    router.push(`/(root)/post/${item.id}`);
  };

  const handleViewPress = async () => {
    router.push(`/(root)/post/${item.id}`);
    await incrementPostViewCount(item.id);
  };

  return (
    <View className="bg-card rounded-2xl shadow-sm mt-4 mx-4 overflow-hidden">
      <Pressable onPress={handleProfilePress} className="flex-row items-center p-4">
        <Avatar
          src={item.doctor.user.profile.avatar}
          fallback={item.doctor.user.first_name.charAt(0) || "N"}
          size="md"
        />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center flex-wrap">
            <Text className="font-semibold text-card-foreground">
              {item.doctor.user.first_name} {item.doctor.user.last_name}
            </Text>
            <Text className="text-card-foreground text-sm ml-2">
              • {item.doctor.specialization?.name || "General"}
            </Text>
          </View>
          <Text className="text-gray-500 text-xs">
            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={handleViewPress} className="px-4 pb-3">
        {item.title && (
          <Text className="text-card-foreground font-medium mb-2">{item.title}</Text>
        )}
        {item.content && (
          <Text numberOfLines={3} className="text-gray-600 text-sm leading-5">
            {item.content}
          </Text>
        )}
      </Pressable>

      {item.media_attachments && item.media_attachments.length > 0 && (
        <MediaGrid attachments={item.media_attachments} />
      )}

      <View className="px-4 py-3 flex-row items-center justify-between border-t border-gray-100 mt-3">
        <View className="flex-row items-center space-x-6 gap-4">
          <Pressable className="flex-row items-center" onPress={handleLikePress}>
            {isLiked ? <Unlike fillColor="#4a90e2" /> : <Like />}
            <Text className="ml-2 text-gray-600 text-sm">{likesCount}</Text>
          </Pressable>
          <Pressable className="flex-row items-center" onPress={handleViewPress}>
            <Message size={18} bubbleColor="#4a90e2" textColor1="#fff" textColor2="#fff" />
            <Text className="ml-2 text-gray-600 text-sm">{item.view_count}</Text>
          </Pressable>
          <Pressable className="flex-row items-center" onPress={handleCommentPress}>
            <Chat color="#4a90e2" size={15} />
            <Text className="ml-2 text-gray-600 text-sm">{item.comments_count}</Text>
          </Pressable>
        </View>
        <Pressable>
          <About size={19} color="#4a90e2" />
        </Pressable>
      </View>
    </View>
  );
};

PostCard.Skeleton = function ItemSkeleton() {
  return (
    <View className="bg-card rounded-2xl shadow-sm mt-4 mx-4 p-4">
      <View className="flex-row items-center">
        <View className="size-12 rounded-full overflow-hidden">
          <Skeleton />
        </View>
        <View className="ml-3 flex-1">
          <View className="h-4 w-36 rounded-md overflow-hidden mb-2">
            <Skeleton />
          </View>
          <View className="h-3 w-24 rounded-md overflow-hidden">
            <Skeleton />
          </View>
        </View>
      </View>

      <View className="mt-4">
        <View className="h-4 w-full rounded-md overflow-hidden mb-2">
          <Skeleton />
        </View>
        <View className="h-4 w-3/4 rounded-md overflow-hidden mb-2">
          <Skeleton />
        </View>
        <View className="h-4 w-1/2 rounded-md overflow-hidden">
          <Skeleton />
        </View>
      </View>

      <View className="mt-4 h-48 rounded-xl overflow-hidden">
        <Skeleton />
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center space-x-6">
          <View className="h-5 w-16 rounded-md overflow-hidden">
            <Skeleton />
          </View>
          <View className="h-5 w-16 rounded-md overflow-hidden">
            <Skeleton />
          </View>
          <View className="h-5 w-16 rounded-md overflow-hidden">
            <Skeleton />
          </View>
        </View>
        <View className="h-5 w-5 rounded-md overflow-hidden">
          <Skeleton />
        </View>
      </View>
    </View>
  );
};