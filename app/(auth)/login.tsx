import React, { useState } from "react";
import { Text, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, View, Button, Keyboard, TextInput, Image, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { useGlobalStore } from "@/core/store";
import api from "@/core/api";
import { ENDPOINTS } from "@/core/config";
import { setAuthTokens } from "@/core/auth";
import images from "@/constants/images";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { refetch, loading, isLogged } = useGlobalStore();

  if (!loading && isLogged) return <Redirect href="/(root)/(tabs)/chat" />;

  const handleLogin = async () => {
    try {
      const response = await api.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.data.access && response.data.refresh) {
        await setAuthTokens(response.data.access, response.data.refresh);
        refetch();
        Alert.alert("Success", "Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid email or password. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
          source={images.logo}
          className="h-20 w-20 mb-20"
        />
          <Text style={styles.title}>PainFX</Text>
          <TextInput 
            style={styles.input}
            placeholder='Legal password 2'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button 
            title='Sign in!' 
            onPress={handleLogin} 
          />
          <Text style={styles.text}>
            Already have an account? <Text 
              style={styles.link}
              onPress={() => router.push('/(auth)/signup')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});