import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, Redirect } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { useGlobalStore } from "@/core/store";
import useAuthCheck from "@/core/hooks/useauth";

const Auth = () => {
  const { loading, isLogged } = useAuthCheck();

  if (!loading && isLogged) return <Redirect href="/(root)/(tabs)/chat/recent" />;

  const handleLoginWithGoogle = async () => {
    try {

    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.onboarding}
          className="w-full h-2/6 my-16"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To PainFX
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Clinit</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to PainFX
          </Text>

          <TouchableOpacity
            onPress={handleLoginWithGoogle}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-primary-300 rounded-full w-full py-4 mt-5">
            <Link href="/login">
              <Text className="text-lg font-rubik-medium text-white text-center">
                Login with Email
              </Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity className="mt-5">
            <Link href="/signup">
              <Text className="text-lg font-rubik text-primary-300 text-center">
                Don't have an account? Register
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;