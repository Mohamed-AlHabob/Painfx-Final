import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalStore } from "@/core/store";
import NoResults from "@/components/NoResults";
import { Cell, Thumbnail } from "@/components/Thumbnail";


const RequestAccept = ({ item }) => {
  const { requestAccept } = useGlobalStore();

  return (
    <TouchableOpacity
      className="bg-gray-800 px-4 h-9 rounded-full flex items-center justify-center"
      onPress={() => requestAccept(item.sender.username)}
    >
      <Text className="text-white font-bold">Accept</Text>
    </TouchableOpacity>
  );
};

const RequestRow = ({ item }) => {
  return (
    <Cell>
      <Thumbnail url={item.sender.thumbnail} size={76} />
      <View className="flex-1 px-4">
        <Text className="font-bold text-gray-900 mb-1">{item.sender.first_name} {item.sender.last_name}</Text>
        <Text className="text-gray-600">
          Requested to connect with you
          <Text className="text-gray-400 text-xs"> {item.created_at}</Text>
        </Text>
      </View>
      <RequestAccept item={item} />
    </Cell>
  );
};

const NotificationPage = () => {
  const { requestList, loading } = useGlobalStore();

  if (loading) {
    return <ActivityIndicator className="flex-1 mt-5 text-primary-300" size="large" />;
  }

  if (!requestList || requestList.length === 0) {
    return <NoResults />;
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={requestList}
        renderItem={({ item }) => <RequestRow item={item} />}
        keyExtractor={(item) => item.sender.username}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      />
    </SafeAreaView>
  );
};

export default NotificationPage;
