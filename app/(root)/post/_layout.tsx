import { Stack } from "expo-router"

export default function CostomLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[postId]/index"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[postId]/reply/[commentId]"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

