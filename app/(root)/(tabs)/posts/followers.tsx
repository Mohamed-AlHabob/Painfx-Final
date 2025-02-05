import { useEffect, useState, useCallback } from "react"
import { ActivityIndicator, FlatList, View, Text } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import PostItem from "@/components/Cards/PostItem"
import { useGlobalStore } from "@/core/store"
import api from "@/core/api"
import { ENDPOINTS } from "@/core/config"

const Posts = () => {
  const { user } = useGlobalStore()
  const params = useLocalSearchParams<{ query?: string }>()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("for-you")

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get(ENDPOINTS.POSTS, {
        params: {
          query: params.query,
          tab: activeTab,
        },
      })

      if (response.data && response.data.results) {
        setPosts(response.data.results)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }, [params.query, activeTab])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchPosts()
    setRefreshing(false)
  }, [fetchPosts])

  const handlePostPress = useCallback((id: string) => {
    router.push(`/chat/${id}`)
  }, [])

  const renderItem = useCallback(({ item }) => <PostItem item={item} onPress={handlePostPress} />, [handlePostPress])


  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="text-gray-500 text-center">No posts found</Text>
            </View>
          )
        }
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  )
}

export default Posts

