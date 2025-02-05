import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Dimensions, Image as RNImage } from 'react-native';
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Text } from "react-native";
import { useRouter } from "expo-router";

interface MediaAttachmentProps {
  attachment: {
    media_type: string;
    file: string | null;
    url: string | null;
    thumbnail: string | null;
    width?: number;
    height?: number;
    aspect_ratio?: number;
  };
}

const MediaAttachment: React.FC<MediaAttachmentProps> = ({ attachment }) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const maxHeight = screenWidth * 1.25; // Max height is 125% of screen width (like Instagram)
  const minHeight = 200; // Minimum height for any media


  const router = useRouter();

  const handlePress = () => {
    if (attachment.media_type === 'image' || attachment.media_type === 'video') {
      router.push({
        pathname: '/(root)/(modals)/show-media/[url]',
        params: { url: attachment.file, type: attachment.media_type }
      });
    }
  };
  
  // Calculate optimal dimensions
  const calculateDimensions = useCallback((width: number, height: number) => {
    if (width && height) {
      const calculatedAspectRatio = width / height;
      const finalAspectRatio = Math.max(0.5, Math.min(2, calculatedAspectRatio)); // Limit aspect ratio between 0.5 and 2
      setAspectRatio(finalAspectRatio);
    }
  }, []);

  // Handle image load to get dimensions
  const handleImageLoad = useCallback((uri: string) => {
    if (attachment.width && attachment.height) {
      calculateDimensions(attachment.width, attachment.height);
    } else {
      RNImage.getSize(
        uri,
        (width, height) => calculateDimensions(width, height),
        () => setIsError(true)
      );
    }
    setIsLoading(false);
  }, [calculateDimensions, attachment.height, attachment.width]); // Added missing dependencies

  // Blur hash placeholder (you can generate this server-side)
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const containerStyle = {
    width: "100%",
    height: Math.min(screenWidth / aspectRatio, maxHeight),
    minHeight,
  };

  // Media error fallback
  if (isError) {
    return (
      <View 
        className="w-full bg-gray-800 rounded-xl items-center justify-center"
        style={{ height: minHeight }}
      >
        <Feather size={24} color="#666" />
      </View>
    );
  }

  return (
    <TouchableOpacity 
      onPress={handlePress}
      className="mt-2 rounded-xl overflow-hidden"
      activeOpacity={0.9}
    >
      {attachment.media_type === "image" && attachment.file && (
        <View style={containerStyle}>
          <Image
            source={{ uri: attachment.file }}
            className="w-full h-full"
            contentFit="cover"
            transition={200}
            placeholder={blurhash}
            onLoad={() => handleImageLoad(attachment.file!)}
          />
          {isLoading && (
            <BlurView 
              intensity={25} 
              className="absolute w-full h-full items-center justify-center"
            >
              <Feather name="image" size={24} color="#666" />
            </BlurView>
          )}
        </View>
      )}

      {attachment.media_type === "video" && attachment.file && (
        <View style={containerStyle}>
          <Video
            source={{ uri: attachment.file }}
            posterSource={{ uri: attachment.thumbnail || attachment.file }}
            usePoster={true}
            posterStyle={{ width: "100%", height: "100%" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            isLooping
            className="rounded-xl"
          />
          {isLoading && (
            <BlurView 
              intensity={25} 
              className="absolute w-full h-full items-center justify-center"
            >
              <Feather name="play-circle" size={24} color="#666" />
            </BlurView>
          )}
        </View>
      )}

      {attachment.url && (
        <TouchableOpacity 
          onPress={() => console.log("Open URL:", attachment.url)}
          className="flex-row items-center mt-2 p-3 bg-gray-800/50 rounded-lg"
        >
          <Feather name="link" size={16} color="#1D9BF0" />
          <Text className="ml-2 text-[#1D9BF0] flex-1 numberOfLines={1} ellipsizeMode='tail'">
            {attachment.url}
          </Text>
          <Feather name="external-link" size={16} color="#1D9BF0" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default MediaAttachment;