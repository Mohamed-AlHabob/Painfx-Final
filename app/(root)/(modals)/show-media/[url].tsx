import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Video, ResizeMode } from 'expo-av';
import { Feather } from '@expo/vector-icons';

export default function MediaViewerPage() {
  const { url, type } = useLocalSearchParams();
  const router = useRouter();
  const [aspectRatio, setAspectRatio] = useState(1);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (type === 'image' && typeof url === 'string') {
        Image.getSize(
        url,
        (width, height) => {
          setAspectRatio(width / height);
        },
        (error) => {
          console.error('Error getting image size:', error);
        }
      );
    }
  }, [url, type]);

  const containerStyle = {
    width: screenWidth,
    height: type === 'image' ? screenWidth / aspectRatio : screenHeight,
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <TouchableOpacity
        className="absolute top-12 left-4 z-10"
        onPress={() => router.back()}
      >
        <Feather name="x" size={24} color="white" />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center">
        {type === 'image' && typeof url === 'string' && (
          <Image
            source={{ uri: url }}
            style={containerStyle}
            // transition={200}
          />
        )}
        {type === 'video' && typeof url === 'string' && (
          <Video
            source={{ uri: url }}
            style={containerStyle}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            isLooping
            shouldPlay
          />
        )}
      </View>
    </View>
  );
}