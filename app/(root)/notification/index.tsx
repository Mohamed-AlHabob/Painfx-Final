import React from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { Link } from "expo-router"

const chatRooms = [
  { id: "1", name: "Dr. Smith" },
  { id: "2", name: "Dr. Johnson" },
  { id: "3", name: "Dr. Williams" },
]

export default function ChatList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/chat/${item.id}`} style={styles.item}>
            <Text>{item.name}</Text>
          </Link>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
})

