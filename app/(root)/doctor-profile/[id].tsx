import React from "react"
import { View, Text, StyleSheet, Image, Button } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

export default function DoctorProfile() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  // In a real app, you'd fetch the doctor's data based on the id
  const doctor = {
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    experience: "15 years",
    image: "https://example.com/doctor-image.jpg",
  }

  const handleNewReservation = () => {
    router.push(`/(main)/(modals)/new-reservation?doctorId=${id}`)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.info}>{doctor.specialty}</Text>
      <Text style={styles.info}>{doctor.experience} of experience</Text>
      <Button title="Make a Reservation" onPress={handleNewReservation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
})

