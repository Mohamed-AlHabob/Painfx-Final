import React from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

const reservations = [
  { id: "1", doctor: "Dr. Smith", date: "2023-06-15 10:00 AM" },
  { id: "2", doctor: "Dr. Johnson", date: "2023-06-20 2:30 PM" },
  { id: "3", doctor: "Dr. Williams", date: "2023-06-25 11:15 AM" },
]


export default function Reservations() {
  const router = useRouter()
  
  const handleNewReservation = () => {
    router.push("/(main)/(modals)/NewReservation")
  }
  const handleReservationPress = (id: string) => {
    router.push(`/reservation-details/${id}`)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reservationItem} onPress={() => handleReservationPress(item.id)}>
            <Text style={styles.doctorName}>{item.doctor}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.newPostButton} onPress={handleNewReservation}>
        <Text style={styles.newPostButtonText}>New Reservation</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reservationItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  newPostButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 30,
  },
  newPostButtonText: {
    color: "white",
    fontWeight: "bold",
  },
})

