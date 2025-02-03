import { useGlobalContext } from "@/providers/global-provider";
import { Redirect, Slot, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  if (!isLogged) {
    return <Redirect href="/(auth)/signup" />;
  }

  return (
    <Stack
      screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShadowVisible: false }}
    >
      <Stack.Screen
        name="notification"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reservation-details"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/NewPost"
        options={{
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="(modals)/EditProfile"
        options={{
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="/(modals)/NewReservation"
        options={{
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="/(modals)/show-media/[url]"
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}