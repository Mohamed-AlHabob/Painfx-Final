import { View, Pressable, Text } from "react-native"
import { router } from "expo-router"
import { Bell, PersonalDevelopment } from "@/constants/icons"
import { Avatar } from "../ui/avatar"
import { useGlobalStore } from "@/core/store";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { user } = useGlobalStore();

  return (
    <View className="flex flex-row bg-background items-center justify-between px-4 pb-2">
      <Pressable onPress={() => router.push("/(root)/profile")}>
      <View className="flex flex-row">
              <Avatar
                   src={user?.profile.avatar}
                   fallback={user?.first_name.charAt(0) || "N"}
                   size="lg"
                 />
                <View className="flex flex-col items-start ml-2 justify-center">
                  {/* <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text> */}
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.first_name} {user?.last_name}
                  </Text>
                </View>
              </View>
      </Pressable>
      <Text className="text-base font-rubik-medium text-black-300">
        {/* {title || "PainFX"} */}
      </Text>

      <View className="flex flex-row items-center">
        <Pressable onPress={() => router.push("/notification")}>
          <Bell bellColor="#4a90e2" notificationColor="#ddd" size={22} />
        </Pressable>
        <Pressable onPress={() => router.push("/profile")} className="ml-6">
          <PersonalDevelopment strokeColor="black"  size={22}  />
        </Pressable>
      </View>
    </View>
  );
}
