import { View, TextInput, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function Header() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/stats")}>
        <Ionicons name="stats-chart" size={24} color="#000" />
      </Pressable>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#71717a" style={styles.searchIcon} />
        <TextInput placeholder="Weekly Music Journey" placeholderTextColor="#71717a" style={styles.searchInput} />
      </View>

      <View style={styles.rightIcons}>
        <Pressable onPress={() => router.push("/notification")} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </Pressable>
        <Pressable onPress={() => router.push("/profile")} style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    height: 56,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    marginHorizontal: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#000",
    fontSize: 15,
    height: "100%",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
})

