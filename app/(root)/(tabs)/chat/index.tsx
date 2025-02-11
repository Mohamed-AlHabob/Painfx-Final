import type React from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { useGlobalStore } from "@/core/store"
import NoResults from "@/components/NoResults"
import { ChatCard } from "@/components/chat/ChatCard"


const ChatsScreen: React.FC = () => {
  const friendList = useGlobalStore((state) => state.friendList)
  const loading = friendList === null

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" className="text-primary-300 mt-5" />
    }

    if (!friendList?.length) {
      return <NoResults />
    }

    return (
      <FlatList
        data={friendList}
        renderItem={({ item }) => <ChatCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    )
  }

  return (
      <View className="p-2">{renderContent()}</View>
  )
}

export default ChatsScreen

