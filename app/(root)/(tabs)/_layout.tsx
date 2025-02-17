import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useGlobalStore } from "@/core/store";
import { useEffect } from "react";
import { Chat, Home, Message } from "@/constants/icons";
import { Reservation } from "@/constants/icons/reservation";
import Header from "@/components/global/header";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: JSX.Element;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    {icon}
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
  const socketConnect = useGlobalStore(state => state.socketConnect);
  const socketClose = useGlobalStore(state => state.socketClose);
  
  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  }, []);
  
  return (
    <><Header /><Tabs
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
            <TabIcon focused={focused} icon={<Message size={18} bubbleColor={focused ? "#4a90e2" : "#000"} textColor1="#fff" textColor2="#fff" />} title="Chat" />
          ),
        }} />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={<Chat color="black" />} title="Search" />
          ),
        }} />
      <Tabs.Screen
        name="posts"
        options={{
          title: "Posts",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={<Home color={focused ? "#4a90e2" : "#000"} />} title="Posts" />
          ),
        }} />
      <Tabs.Screen
        name="reservations"
        options={{
          title: "Reservations",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={<Reservation className={focused ? "#4a90e2" : "#000"} />} title="Reservations" />
          ),
        }} />
    </Tabs></>
  );
};

export default TabsLayout;