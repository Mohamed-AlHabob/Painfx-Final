import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { login } from "@/core/api";
import { setAuthTokens } from "@/core/auth";
import { useGlobalStore } from "@/core/store";
import { Google } from "@/constants/icons";
import { Logo } from "@/constants/icons/logo";

const Auth = () => {
  const { fetchUser } = useGlobalStore()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const response = await login(credentials);

      if (response.access && response.refresh) {
        await setAuthTokens(response.access, response.refresh);
        fetchUser()
        router.push("/(root)/(tabs)/chat");
        Alert.alert("Success", "Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid email or password. Please try again.");
    }
  };
  const handleLoginWithoutAccount = async () => {
    try {
      const credentials = { email: "admin@painfx.in",password: "admin" };
      const response = await login(credentials);

      if (response.access && response.refresh) {
        await setAuthTokens(response.access, response.refresh);
        fetchUser()
        router.push("/(root)/(tabs)/chat");
        Alert.alert("Success", "Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid email or password. Please try again.");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      // Implement Google login logic here
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
    }
  };

  return (
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Logo className="w-full h-1/6 my-4"/>
        <View className="px-10">
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
              <Google />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
             className="bg-gray-100 rounded-full w-full py-3 px-5 mt-5"
             placeholder="Email"
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
             autoCapitalize="none"
           />           

           <TextInput
             className="bg-gray-100 rounded-full w-full py-3 px-5 mt-5"
             placeholder="Password"
             secureTextEntry
             value={password}
             onChangeText={setPassword}
             autoCapitalize="none"
           />
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-primary rounded-full w-full py-4 mt-5"
          >
            <Text className="text-lg font-rubik-medium text-primary-foreground text-center">
              Login with Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-5" onPress={handleLoginWithoutAccount}>
              <Text className="text-lg font-rubik text-primary-300 text-center">
                Use without an account
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
};

export default Auth;