import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createPost } from "@/core/api";

export default function NewPost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handlePost = async () => {
    if (!content || !title) {
      Alert.alert("Error", "Please fill in both title and content.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", JSON.stringify(tags));
      const response = await createPost(formData);

      if (response) {
        Alert.alert("Success", "Post created successfully!");
        router.back();
      } else {
        Alert.alert("Error", "Failed to create post.");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>New Post</Text>
          <Pressable
            style={[styles.postButton, loading && styles.disabledButton]}
            onPress={handlePost}
            disabled={loading}
          >
            <Text style={styles.postButtonText}>{loading ? "Posting..." : "Post"}</Text>
          </Pressable>
        </View>

        {/* Input Area */}
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#71717a"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.contentInput}
          multiline
          placeholder="What's on your mind?"
          placeholderTextColor="#71717a"
          value={content}
          onChangeText={setContent}
        />


        {/* Tags Section */}
        <View style={styles.tagsContainer}>
          <Pressable style={styles.tagButton} onPress={() => setTags([...tags, "New Tag"])}>
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
      <View style={styles.toolbar}>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="image" size={24} color="#000" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="camera" size={24} color="#000" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="document" size={24} color="#000" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="location" size={24} color="#000" />
        </Pressable>
        <Pressable style={styles.toolbarButton}>
          <Ionicons name="people" size={24} color="#000" />
        </Pressable>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space for the toolbar
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
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
  disabledButton: {
    opacity: 0.5,
  },
  titleInput: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  contentInput: {
    color: "#000",
    fontSize: 16,
    padding: 16,
    minHeight: 150,
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
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  toolbarButton: {
    padding: 8,
  },
});