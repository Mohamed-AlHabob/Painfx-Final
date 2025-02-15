import { View, Text, Pressable, Image} from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Link, router } from "expo-router";
import icons from "@/constants/icons";
import { Avatar } from "../ui/avatar";
import { Skeleton } from "../global/skeleton";
import { useGlobalStore } from "@/core/store";

interface Comment {
  id: string;
  text: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    profile: {
      avatar: string;
    };
  };
  media_attachments?: Array<{
    id: string;
    file: string;
    media_type: "image" | "video";
  }>;
  replies: Comment[];
  created_at: string;
}

interface CommentCardProps {
  comment: Comment;
  postId: string;
}

export const CommentCard = ({ comment, postId }: CommentCardProps) => {
  // const { user } = useGlobalStore();


  // const isCommentCreator = user?.id === comment.user.id;

  const handleProfilePress = () => {
    router.push(`/(root)/profile/${comment.user.id}`);
  };

  return (
    <View className="bg-white rounded-2xl shadow-sm mt-2 mx-4 overflow-hidden">
      <View className="flex-row p-4">
        <Pressable onPress={handleProfilePress} accessibilityRole="button" accessibilityLabel="User profile">
          <View className="rounded-full overflow-hidden bg-gray-100">
            <Avatar
              src={comment.user?.profile?.avatar}
              fallback={comment.user.first_name.charAt(0) || "N"}
              size="md"
            />
          </View>
        </Pressable>

        <View className="flex-1 ml-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-wrap">
              <Text className="font-semibold text-gray-900">
                {comment.user.first_name} {comment.user.last_name}
              </Text>
              <Text className="text-gray-500 text-xs ml-2">• {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</Text>
            </View>
          </View>
          <Link href={`/post/${postId}/reply/${comment.id}`} asChild>
            <Pressable>
              <Text className="text-gray-600 text-sm mt-1">{comment.text}</Text>
              <View className="flex-row items-center mt-2 space-x-4">
                <Pressable
                  className="flex-row items-center"
                  accessibilityRole="button"
                  accessibilityLabel="Reply to comment"
                >
                  <Image source={icons.chat} className="size-4" />
                  <Text className="ml-2 text-gray-500 text-xs">Reply</Text>
                </Pressable>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
};

CommentCard.Skeleton = function CommentSkeleton() {
  return (
    <View className="bg-white rounded-2xl shadow-sm mt-4 mx-4 p-4">
      <View className="flex-row items-center">
        <View className="size-12 rounded-full overflow-hidden">
          <Skeleton />
        </View>
        <View className="ml-3 flex-1">
          <View className="h-4 w-36 rounded-md overflow-hidden mb-2">
            <Skeleton />
          </View>
          <View className="h-3 w-24 rounded-md overflow-hidden">
            <Skeleton />
          </View>
        </View>
      </View>
      <View className="mt-4 flex-row items-center justify-between">
        <View className="h-5 w-5 rounded-md overflow-hidden">
          <Skeleton />
        </View>
      </View>
    </View>
  );
};