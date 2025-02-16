import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { router } from "expo-router";
import { Avatar } from "@/components/ui/avatar";
import { Ionicons } from "@expo/vector-icons";
import { Friend } from "@/core/types";
import { Skeleton } from "../global/skeleton";

interface ChatCardProps {
  item: Friend;
}

export const ChatCard = ({ item }: ChatCardProps) => {
  const { id, friend, preview, updated_at = false } = item;
  const { first_name, last_name, profile, is_online } = friend;

  return (
    <Pressable
      className={`flex-row bg-white rounded-2xl shadow-sm items-center px-4 py-3 mt-4 mx-4 overflow-hidden`}
      onPress={() => router.push(`/(root)/chat/${id}`)}
    >
      <View className="relative">
        <Avatar
          src={profile.avatar}
          fallback={first_name.charAt(0) || "N"}
          size="lg"
          className="mr-3"
        />
        {is_online && (
          <View className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>
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
  );
};

ChatCard.Skeleton = function ChatSkeleton() {
  return (
    <View className="flex-row bg-white rounded-2xl shadow-sm items-center px-4 py-3 mt-4 mx-4 overflow-hidden">
      <View className="h-12 w-12 rounded-full overflow-hidden mr-3">
        <Skeleton />
      </View>

      {/* Content Skeleton */}
      <View className="flex-1">
        {/* Name and Timestamp Skeleton */}
        <View className="flex-row justify-between items-center">
          <View className="w-1/3 h-4 bg-gray-200 rounded" />
          <View className="w-1/4 h-3 bg-gray-200 rounded" />
        </View>

        <View className="flex-row items-center mt-2">
          <View className="w-2/3 h-3 bg-gray-200 rounded" />
          <View className="ml-2 w-4 h-4 bg-gray-200 rounded" />
        </View>
      </View>
    </View>
  );
};