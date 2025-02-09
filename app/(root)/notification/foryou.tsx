import { useEffect, useState, useCallback } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { router } from "expo-router"
import api from "@/core/api"
import { ENDPOINTS } from "@/core/config"
import NoResults from "@/components/NoResults"
import NotificationCard from "@/components/NotificationCard"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get(ENDPOINTS.NOTIFICATIONS)

      if (response.data && response.data) {
        setNotifications(response.data)
      } else {
        setNotifications([])
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchNotifications()
    setRefreshing(false)
  }, [fetchNotifications])

  const handleNotificationPress = useCallback((id: string) => {
    router.push(`/(root)/(modals)/show-media/${id}`);
  }, [])


  const renderItem = useCallback(({ item }) => <NotificationCard item={item} />, [handleNotificationPress])


  return (
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <View className="flex-1 items-center justify-center p-4">
               <NoResults />
            </View>
          )
        }
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
  )
}

export default Notifications

