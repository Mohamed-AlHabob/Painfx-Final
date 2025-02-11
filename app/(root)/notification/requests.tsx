import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow } from "date-fns"
import { useGlobalStore } from "@/core/store";
import NoResults from "@/components/NoResults";
import { Avatar } from "@/components/ui/avatar";



const RequestAccept = ({ item }) => {
  const { requestAccept } = useGlobalStore();

  return (
    <TouchableOpacity
      className="bg-gray-800 px-4 h-9 rounded-full flex items-center justify-center"
      onPress={() => requestAccept(item.sender.first_name)}
    >
      <Text className="text-white font-bold">Accept</Text>
    </TouchableOpacity>
  );
};

const RequestRow = ({ item }) => {
  return (
    <View  className="flex-row bg-white rounded-2xl items-center px-4 py-3 shadow-sm mt-4 mx-4 overflow-hidden" >
       <Avatar
        src={item.sender.profile.avatar}
        fallback={item.sender.first_name.charAt(0) || "N"}
        size="lg"
        />
      <View className="flex-1 px-4">
        <Text className="font-bold text-gray-900 mb-1">{item.sender.role} : {item.sender.first_name} {item.sender.last_name}</Text>
        <Text className="text-gray-600">
          Requested to connect with you
        </Text>
          <Text className="text-gray-400 text-xs"> {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</Text>
      </View>
      <RequestAccept item={item} />
    </View>
  );
};

const NotificationPage = () => {
  const { requestList, loading } = useGlobalStore();

  return (
      <FlatList
        data={requestList}
        renderItem={({ item }) => <RequestRow item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <View className="flex-1 items-center justify-center p-4">
               <NoResults />
            </View>
          )
        }
      />
  );
};

export default NotificationPage;
