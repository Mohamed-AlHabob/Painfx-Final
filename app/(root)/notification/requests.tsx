import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useGlobalStore } from "@/core/store";
import { Avatar } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import NoResults from "@/components/global/NoResults";

const RequestList = () => {
  const { requestList, requestAccept } = useGlobalStore();
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [requestList]);

  const handleAccept = async (id) => {
    setAccepting(true);
    try {
      const response = await requestAccept(id);
      if (response.status === 'success') {
        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while accepting the request.');
    } finally {
      setAccepting(false);
    }
  };

  return (
    <View className="px-5 pb-32">
      <Text className="text-xl font-rubik-bold text-black-300 mt-5">Friend Requests</Text>
      {loading ? (
        <ActivityIndicator size="large" className="text-primary-300 mt-5" />
      ) : requestList && requestList.length > 0 ? (
        <FlatList
          data={requestList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex flex-row items-center justify-between p-3 border-b border-gray-200">
              <View className="flex flex-row items-center">
                <Avatar src={item.sender.profile.avatar} fallback={item.sender.first_name.charAt(0)} size="lg" />
                <View className="ml-3">
                  <Text className="text-base font-rubik-medium text-black-300">{item.sender.first_name} {item.sender.last_name}</Text>
                  <Text className="text-xs text-gray-500">{item.sender.username}</Text>
                </View>
              </View>
              <TouchableOpacity
                className="bg-primary-300 px-4 py-2 rounded-lg"
                onPress={() => handleAccept(item.id)}
                disabled={accepting}
              >
                <Text className="text-white text-sm font-rubik-bold">
                  {accepting ? 'Accepting...' : 'Accept'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NoResults />
      )}
    </View>
  );
};

export default RequestList;