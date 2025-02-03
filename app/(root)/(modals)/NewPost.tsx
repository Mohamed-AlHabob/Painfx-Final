import { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function NewPost() {
  const [content, setContent] = useState("")
  const [tags, setTags] = useState(["My first post"])
  const router = useRouter()

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>Post</Text>
          <Pressable style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
          </Pressable>
        </View>

        {/* Input Area */}
        <TextInput
          style={styles.input}
          multiline
          placeholder="What's on your mind?"
          placeholderTextColor="#71717a"
          value={content}
          onChangeText={setContent}
        />
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            1. Post Moments in your native language and learning language. It's a two-way learning experience for you
            and your language partners.
          </Text>
          <Text style={styles.instructionText}>2. Add pictures or voice notes to make your Moments stand out.</Text>
          <Text style={styles.instructionText}>
            3. Add multiple tags to increase the visibility of your Moments, reaching even more language partners.
          </Text>
        </View>

        {/* Tags Section */}
        <View style={styles.tagsContainer}>
          <Pressable style={styles.tagButton}>
            <Text style={styles.tagButtonText}># Add a topic</Text>
          </Pressable>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
              <Pressable onPress={() => setTags(tags.filter((_, i) => i !== index))}>
                <Ionicons name="close" size={16} color="#71717a" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="mic-outline" size={24} color="#71717a" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="image-outline" size={24} color="#71717a" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="happy-outline" size={24} color="#71717a" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="language-outline" size={24} color="#71717a" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="add-circle-outline" size={24} color="#71717a" />
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  postButton: {
    backgroundColor: "#D8D8D8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  postButtonText: {
    color: "#71717a",
    fontWeight: "600",
  },
  instructions: {
    padding: 16,
  },
  instructionText: {
    color: "#71717a",
    marginBottom: 16,
    fontSize: 15,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 8,
  },
  tagButton: {
    backgroundColor: "#D8D8D8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagButtonText: {
    color: "#71717a",
  },
  input: {
    color: "#000",
    fontSize: 16,
    padding: 16,
    minHeight: 100,
  },
  tag: {
    backgroundColor: "#D8D8D8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8,
  },
  tagText: {
    color: "#71717a",
  },
  toolbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  toolbarButton: {
    padding: 8,
  },
})

