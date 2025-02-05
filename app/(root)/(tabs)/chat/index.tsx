import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalStore } from "@/core/store";
import { Link, router } from "expo-router";
import { Cell, Thumbnail } from "@/components/Thumbnail";
import icons from "@/constants/icons";
import { formatTime } from "@/core/utils";
import NoResults from "@/components/NoResults";

const FriendRow = ({ id ,item }) => (
  <TouchableOpacity onPress={() => router.push(`/(root)/chat/${id}`, item)}>
    <Cell>
      <Thumbnail url={item.friend.thumbnail } size={76} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ fontWeight: 'bold', color: '#202020', marginBottom: 4 }}>
          {item.friend.first_name} {item.friend.last_name}
        </Text>
        <Text style={{ color: '#606060' }}>
          {item.preview}
          <Text style={{ color: '#909090', fontSize: 13 }}>
            {formatTime(item.updated_at)}
          </Text>
        </Text>
      </View>
    </Cell>
  </TouchableOpacity>
);

const ChatsScreen = () => {
  const friendList = useGlobalStore(state => state.friendList);
  const loading = friendList === null;

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="p-2">
        {/* <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold text-black-300">Chats</Text>
          <Link href={"/notification"}>
            <Image source={icons.bell} className="size-6" />
          </Link>
        </View> */}

        {loading ? (
          <ActivityIndicator size="large" className="text-primary-300 mt-5" />
        ) : friendList?.length === 0 ? (
          <NoResults />
        ) : (
          <FlatList
            data={friendList}
            renderItem={({ item }) => <FriendRow id={item.id} item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;
