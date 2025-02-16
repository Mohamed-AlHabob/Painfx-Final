import { useGlobalStore } from "@/core/store";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function AppLayout() {
  const socketConnect = useGlobalStore(state => state.socketConnect)
	const socketClose = useGlobalStore((state: { socketClose: any; }) => state.socketClose)

  useEffect(() => {
		socketConnect()
		return () => {
			socketClose()
		}
	}, [])


  return (
    <Stack
      screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShadowVisible: false }}
    >
      <Stack.Screen
        name="notification"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }} />
      <Stack.Screen
        name="profile"
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }} />
      <Stack.Screen
        name="post"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }} />
      <Stack.Screen
        name="reservation-details"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }} />
      <Stack.Screen
        name="chat"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }} />
      <Stack.Screen
        name="(modals)/NewPost"
        options={{
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
        }} />
      <Stack.Screen
        name="(modals)/EditProfile"
        options={{
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
        }} />
      <Stack.Screen
        name="/(modals)/NewReservation"
        options={{
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
        }} />
      <Stack.Screen
        name="/(modals)/show-media/[url]"
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}