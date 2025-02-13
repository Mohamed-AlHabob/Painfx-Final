import { View, Text, Pressable, Image } from "react-native";
import icons from "@/constants/icons";
import { formatDistanceToNow } from "date-fns";
import { Link, router } from "expo-router";
import MediaGrid from "./MediaAttachment";
import { Avatar } from "../ui/avatar";
import { useState } from "react";
import { incrementPostViewCount, likePost, unlikePost } from "@/core/api";
import { Skeleton } from "../global/skeleton";

interface PostCardProps {
  item: any & {
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
          setLikesCount((prev: number) => prev - 1);
          setLikeId(null);
        }
      } else {
        const response = await likePost(item.id);
        setLikesCount((prev: number) => prev + 1);
        setLikeId(response.id);
      }
      setIsLiked((prev: any) => !prev);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  

  const handleCommentPress = () => {
    router.push(`/(root)/post/${item.id}`);
  };

  const handleViewPress = async () => {
   await incrementPostViewCount(item.id)
    router.push(`/(root)/post/${item.id}`);
  };

  return (
    <View className="bg-white rounded-2xl shadow-sm mt-4 mx-4 overflow-hidden">
      <Pressable onPress={handleProfilePress} className="flex-row items-center p-4">
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
            <Text numberOfLines={3} className="text-gray-600 text-sm leading-5">
              {item.content}
            </Text>
          )}
        </View>
      </Link>

      {item.media_attachments && item.media_attachments.length > 0 && (
        <MediaGrid attachments={item.media_attachments} />
      )}

      <View className="px-4 py-3 flex-row items-center justify-between border-t border-gray-100 mt-3">
        <View className="flex-row items-center space-x-6 gap-4">
          <Pressable className="flex-row items-center" onPress={handleLikePress}>
            <Image
              source={isLiked ? icons.heart : icons.heart}
              className="size-5"
              tintColor={isLiked ? "#EF4444" : "#6B7280"} 
            />
            <Text className="ml-2 text-gray-600 text-sm">{likesCount || 0}</Text>
          </Pressable>
          <Pressable className="flex-row items-center" onPress={handleViewPress}>
            <Image source={icons.send} className="size-5" />
            <Text className="ml-2 text-gray-600 text-sm">{item.view_count || 0}</Text>
          </Pressable>
          <Pressable className="flex-row items-center" onPress={handleCommentPress}>
            <Image source={icons.chat} className="size-5" />
            <Text className="ml-2 text-gray-600 text-sm">{item.comments_count || 0}</Text>
          </Pressable>
        </View>
        <Pressable>
          <Image source={icons.info} className="size-5" />
        </Pressable>
      </View>
    </View>
  );
};

PostCard.Skeleton = function ItemSkeleton() {
  return ( 
    <View className="bg-white rounded-2xl shadow-sm mt-4 mx-4 p-4">
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
   )
}