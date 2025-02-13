import { View, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MediaGrid({ attachments, onRemove }) {
  return (
    <View style={styles.container}>
      {attachments.map((media, index) => (
        <View key={index} style={styles.mediaItem}>
          <Image source={{ uri: media.uri }} style={styles.mediaImage} />
          <Pressable style={styles.removeButton} onPress={() => onRemove(index)}>
            <Ionicons name="close" size={16} color="#fff" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 16,
  },
  mediaItem: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    padding: 4,
  },
});