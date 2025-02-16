import { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { replyToComment, getCommentById } from "@/core/api";
import { CommentCard } from "@/components/post/CommentCard";
import { Input } from "@/components/global/Input";
import { Bell, IDuotoneBlack } from "@/constants/icons";

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

export default function ReplyScreen() {
  const { postId, commentId } = useLocalSearchParams<{ postId: string; commentId: string }>();
  const [parentComment, setParentComment] = useState<Comment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchParentComment = async () => {
      try {
        setIsLoading(true);
        const commentData = await getCommentById(commentId);
        if (isMounted) {
          setParentComment({
            ...commentData,
            replies: commentData.replies || [],
          });
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch comment. Please try again.");
        console.error("Error fetching comment:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchParentComment();
    return () => {
      isMounted = false;
    };
  }, [commentId]);

  const handleSubmitReply = async (text: string) => {
    if (!parentComment || !commentId) return;

    try {
      const newReply = await replyToComment(commentId, postId, text);
      if (parentComment) {
        setParentComment({
          ...parentComment,
          replies: [newReply, ...parentComment.replies],
        });
      }
    } catch (err) {
      setError("Failed to submit reply. Please try again.");
      console.error("Error submitting reply:", err);
    }
  };

  if (isLoading) {
    return (
      <>
        <CommentCard.Skeleton />
        <CommentCard.Skeleton />
      </>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 mb-4">{error}</Text>
        <TouchableOpacity
          onPress={() => {
            setError(null);
            setIsLoading(true);
          }}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!parentComment) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Comment not found.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <FlatList
        data={parentComment.replies}
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
                  <IDuotoneBlack />
                </TouchableOpacity>

                <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                  {parentComment.user.first_name} {parentComment.user.last_name}
                </Text>
                <Bell/>
              </View>
            </View>
            <CommentCard comment={parentComment} postId={postId} />
            <View className="mt-4 p-4">
              <Text className="text-lg font-semibold ">Replies ({parentComment.replies.length || 0})</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View className="p-4">
            <Text className="text-gray-500">No replies yet</Text>
          </View>
        }
        renderItem={({ item }) => <CommentCard key={item.id} comment={item} postId={postId} />}
        ListFooterComponent={<View style={{ height: 80 }} />}
        contentContainerClassName="pb-20"
      />
      <Input onSubmit={handleSubmitReply} placeholder={`Reply to ${parentComment.user.first_name} ${parentComment.user.last_name}...`} />
    </KeyboardAvoidingView>
  );
}