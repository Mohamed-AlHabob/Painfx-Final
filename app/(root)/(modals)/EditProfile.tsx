import React, { useState } from "react"
import { View, TextInput, Button, StyleSheet } from "react-native"
import { useRouter } from "expo-router"

export default function EditProfile() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving profile:", name)
    router.back()
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <Button title="Save" onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
})

