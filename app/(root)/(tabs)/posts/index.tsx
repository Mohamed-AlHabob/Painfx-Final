import { useEffect, useState, useCallback } from "react"
import { ActivityIndicator, FlatList, View, RefreshControl } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import Search from "@/components/Search"
import NoResults from "@/components/NoResults"
import { useGlobalContext } from "@/providers/global-provider"
import { ENDPOINTS } from "@/services/config"
import api from "@/services/api"
import PostItem from "@/components/Cards/PostItem"
import PostsHeader from "@/components/Cards/PostsHeader"

const Posts = () => {
  const { user } = useGlobalContext()
  const params = useLocalSearchParams<{ query?: string }>()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(ENDPOINTS.POSTS, {
        params: {
          query: params.query,
        },
      });
  
      console.log("Fetched posts:", response.data); // Debugging
  
      if (response.data && response.data.results) {
        setPosts(response.data.results);
      } else {
        setPosts([]); // Ensure posts is always an array
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [params.query]);
  

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

  const handleLikePress = useCallback((id: string) => {
    // Implement like functionality
    console.log("Like pressed for post:", id)
  }, [])

  const handleCommentPress = useCallback((id: string) => {
    // Navigate to comments page or open comments modal
    console.log("Comment pressed for post:", id)
  }, [])

  const handleSharePress = useCallback((id: string) => {
    // Implement share functionality
    console.log("Share pressed for post:", id)
  }, [])

  const renderItem = useCallback(
    ({ item }) => (
      <PostItem
        item={item}
        onPress={handlePostPress}
        onLikePress={handleLikePress}
        onCommentPress={handleCommentPress}
        onSharePress={handleSharePress}
      />
    ),
    [handlePostPress, handleLikePress, handleCommentPress, handleSharePress],
  )

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <PostsHeader user={user} /> */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" className="text-primary-300 mt-5" /> : <NoResults />
        }
        ListHeaderComponent={() => (
          <View className="px-4 py-2">
            <Search />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Posts

