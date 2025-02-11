import { useEffect, useState, useCallback } from "react"
import { ActivityIndicator, FlatList, View,Text, Image, Pressable } from "react-native"
import { router } from "expo-router"
import api from "@/core/api"
import { ENDPOINTS } from "@/core/config"
import PostCard from "@/components/post/PostItem"
import NoResults from "@/components/NoResults"
import icons from "@/constants/icons"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get(ENDPOINTS.POSTS)

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
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchPosts()
    setRefreshing(false)
  }, [fetchPosts])

  const handlePostPress = useCallback((id: string) => {
    router.push(`/(root)/(modals)/show-media/${id}`);
  }, [])

  const renderItem = useCallback(({ item }) => <PostCard item={item} onPress={handlePostPress} />, [handlePostPress])


  return (
      <><FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerClassName="pb-20"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={loading ? (
        <ActivityIndicator size="large" className="text-primary-300 mt-5" />
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <NoResults />
        </View>
      )}
      onRefresh={handleRefresh}
      refreshing={refreshing} /><Pressable onPress={handleNewPostPress => ({})}>
        <Image source={icons.info} className="size-5" />
        <Text>New Post</Text>
      </Pressable></>
  )
}

export default Posts

