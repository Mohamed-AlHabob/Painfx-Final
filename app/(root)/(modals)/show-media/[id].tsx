
  import React, { useCallback, useEffect, useState } from "react";
  import { View, TouchableOpacity, Dimensions, StatusBar } from "react-native";
  import { Stack, useRouter, useLocalSearchParams } from "expo-router";
  import { Feather } from "@expo/vector-icons";
  import { BlurView } from "expo-blur";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Image } from "expo-image";
  import { Video, ResizeMode } from "expo-av";
  import { Text } from "react-native";
  import api from "@/core/api";
  import { ENDPOINTS } from "@/core/config";
  
  interface Post {
    id: string;
    media_type: "image" | "video";
    file: string;
    likes_count: number;
    comments_count: number;
    reposts_count: number;
    shares_count: number;
  }
  
  export default function PostScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    // const { url } = useLocalSearchParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await api.get(`${ENDPOINTS.POSTS}/${id}`);
          setPost(response.data);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPost();
    }, [id]);
  
    const handleClose = useCallback(() => {
      router.back();
    }, [router]);
  
    if (!post && !loading) {
      return null;
    }
  
    return (
      <View className="flex-1 bg-black">
        <StatusBar barStyle="light-content" />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        
        <SafeAreaView className="flex-1">
          {/* Close Button */}
          <TouchableOpacity
            onPress={handleClose}
            className="absolute left-4 top-4 z-10 rounded-full bg-black/50 p-2"
          >
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
  
          {/* Media Content */}
          <View className="flex-1 justify-center">
            {post?.media_type === "image" ? (
              <Image
                source={{ uri: post.file }}
                style={{
                  width: screenWidth,
                  height: screenHeight * 0.8,
                }}
                contentFit="contain"
                transition={200}
              />
            ) : (
              <Video
                source={{ uri: post?.file }}
                style={{
                  width: screenWidth,
                  height: screenHeight * 0.8,
                }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                isLooping
                shouldPlay
              />
            )}
          </View>
  
          {/* Bottom Interaction Bar */}
          <BlurView
            intensity={30}
            className="absolute bottom-0 w-full flex-row justify-around py-4 px-6"
          >
            <TouchableOpacity className="flex-row items-center">
              <Feather name="heart" size={24} color="white" />
              <Text className="ml-2 text-white">{post?.likes_count || 0}</Text>
            </TouchableOpacity>
  
            <TouchableOpacity className="flex-row items-center">
              <Feather name="message-circle" size={24} color="white" />
              <Text className="ml-2 text-white">{post?.comments_count || 0}</Text>
            </TouchableOpacity>
  
            <TouchableOpacity className="flex-row items-center">
              <Feather name="repeat" size={24} color="white" />
              <Text className="ml-2 text-white">{post?.reposts_count || 0}</Text>
            </TouchableOpacity>
  
            <TouchableOpacity className="flex-row items-center">
              <Feather name="share" size={24} color="white" />
              <Text className="ml-2 text-white">{post?.shares_count || 0}</Text>
            </TouchableOpacity>
          </BlurView>
        </SafeAreaView>
      </View>
    );
  }