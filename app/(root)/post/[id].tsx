import { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import { createComment, getPost, getPostComments } from "@/core/api";
import { PostCard } from "@/components/post/PostCard";
import { CommentCard } from "@/components/post/CommentCard";
import { Input } from "@/components/global/Input";

interface Comment {
  id: string;
  text: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    profile: { avatar: string };
  };
  media_attachments?: Array<{ id: string; file: string; media_type: "image" | "video" }>;
  replies: Comment[];
  created_at: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  doctor: {
    id: string;
    user: { id: string; first_name: string; last_name: string; profile: { avatar: string } };
    specialization: { name: string };
  };
  media_attachments: Array<{ id: string; file: string; media_type: "image" | "video" }>;
  likes_count: number;
  comments_count: number;
  view_count: number;
  created_at: string;
}

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postData, commentsData] = await Promise.all([
          getPost(id as string),
          getPostComments(id as string),
        ]);

        if (isMounted) {
          setPost(postData);
          setComments(commentsData);
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch post details. Please try again.");
        console.error("Error fetching post details:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmitComment = async (text: string) => {
    try {
      const newComment = await createComment(id as string, text);
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      setError("Failed to submit comment. Please try again.");
      console.error("Error submitting comment:", err);
    }
  };

  if (isLoading) {
    return (
      <>
        <PostCard.Skeleton />
        <CommentCard.Skeleton />
        <CommentCard.Skeleton />
      </>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        ListHeaderComponent={
          <>
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                {post?.doctor.user.first_name} {post?.doctor.user.last_name}
              </Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>
          </View>
          <PostCard item={post} />
          <View className="mt-4 p-4">
              <Text className="text-lg font-semibold ">Comments ({post?.comments_count || 0})</Text>
          </View>
          </>
        }
        ListEmptyComponent={
          <View className="p-4">
            <Text className="text-gray-500">No comments yet</Text>
          </View>
        }
        renderItem={({ item }) => <CommentCard key={item.id} comment={item} postId={id as string} />}
        ListFooterComponent={<View style={{ height: 80 }} />}
        contentContainerClassName="pb-20"
      />
      <Input onSubmit={handleSubmitComment}  placeholder={`comment to ${post?.doctor.user.first_name} ${post?.doctor.user.last_name}...` || "Write a comment..."} />
    </KeyboardAvoidingView>
  );
}