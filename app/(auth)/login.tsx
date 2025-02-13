import React, { useState } from "react"
import { Text, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, View, Button, Keyboard, TextInput } from "react-native"
import { Redirect, router } from "expo-router"
import { useGlobalStore } from "@/core/store"
import api from "@/core/api"
import { ENDPOINTS } from "@/core/config"
import { setAuthTokens } from "@/core/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
					<View 
						style={{ 
							flex: 1, 
							justifyContent: 'center',
							paddingHorizontal: 20
						}}
					>
						<TextInput 
							placeholder='Email'
							value={email}
							onChangeText={setEmail}
						/>
						<TextInput 
							placeholder='Password'
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>
						<Button 
							title='Sign In' 
							onPress={handleLogin} 
						/>
						<Text style={{ textAlign: 'center', marginTop: 40 }}>
							Don't have an account? <Text 
								style={{ color: 'blue' }}
								onPress={() => router.push('/(auth)/signup')}
							>
								Sign Up
							</Text>
						</Text>

					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
  )
}