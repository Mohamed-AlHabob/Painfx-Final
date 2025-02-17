import React from "react";
import {FlatList, View } from "react-native";
import { useGlobalStore } from "@/core/store";

import { ChatCard } from "@/components/chat/ChatCard";
import NoResults from "@/components/global/NoResults";

const ChatsScreen: React.FC = () => {
  const friendList = useGlobalStore((state) => state.friendList);
  const loading = friendList === null;

  if (loading) {
    return (
       <><ChatCard.Skeleton /><ChatCard.Skeleton /><ChatCard.Skeleton /><ChatCard.Skeleton /><ChatCard.Skeleton /></>
    );
  }

  if (!friendList?.length) {
    return (
      <View className="flex-1 justify-center items-center bg-backgroun">
        <NoResults />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={friendList}
        renderItem={({ item }) => <ChatCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChatsScreen;
