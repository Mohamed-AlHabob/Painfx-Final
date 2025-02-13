import { Stack } from "expo-router"

export default function CostomLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

