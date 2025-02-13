import { useEffect, useState, useCallback } from "react"
import { ActivityIndicator, FlatList, View, Text } from "react-native"
import { router } from "expo-router"
import api from "@/core/api"
import { ENDPOINTS } from "@/core/config"
import ReservationCard from "@/components/reservation/ReservationCard"
import NoResults from "@/components/global/NoResults"


const Reservations = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get(ENDPOINTS.RESERVATIONS)

      if (response.data && response.data.results) {
        setReservations(response.data.results)
      } else {
        setReservations([])
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchReservations()
    setRefreshing(false)
  }, [fetchReservations])

  const handleRservationPress = useCallback((id: string) => {
    router.push(`/reservations/${id}`);
  }, [])

  const renderItem = useCallback(({ item }) => <ReservationCard reservation={item} onCancel={function (id: string): void {
    throw new Error("Function not implemented.")
  } }  />, [handleRservationPress])


  return (
      <FlatList
        data={reservations}
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

export default Reservations

