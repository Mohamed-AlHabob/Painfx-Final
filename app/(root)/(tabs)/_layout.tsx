import { Redirect, Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import icons from "@/constants/icons";
import { useGlobalStore } from "@/core/store";
import { useEffect } from "react";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const { loading, isLogged } = useGlobalStore();
  const socketConnect = useGlobalStore(state => state.socketConnect)
	const socketClose = useGlobalStore(state => state.socketClose)
  if (!loading && !isLogged) return <Redirect href="/(auth)/signup" />;
  
  useEffect(() => {
		socketConnect()
		return () => {
			socketClose()
		}
	}, [])
  
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.chat} title="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Searsh" />
          ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: "Posts",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Posts" />
          ),
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          title: "Reservations",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.calendar} title="Reservations" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
