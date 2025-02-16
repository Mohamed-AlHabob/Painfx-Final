import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { router } from "expo-router";

import Search from "@/components/Search";
import Filters from "@/components/global/Filters";
import NoResults from "@/components/global/NoResults";
import { useGlobalStore } from "@/core/store";
import { Bell, IDuotoneBlack } from "@/constants/icons";

const Explore = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { searchList, searchUsers,requestConnect } = useGlobalStore();

  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery);
    } else {
      useGlobalStore.setState({ searchList: null });
    }
  }, [searchQuery]);

  const handleCardPress = (id: string) => router.push(`/profile/${id}`);

  const renderUserItem = ({ item }) => {
    const statusColors = {
      connected: "text-green-600 bg-green-100",
      "no-connection": "text-blue-600 bg-blue-100",
      "pending-them": "text-yellow-600 bg-yellow-100",
      "pending-me": "text-yellow-600 bg-yellow-100",
    };

    const getButtonProps = () => {
      switch (item.status) {
        case "no-connection":
          return { text: "Connect", disabled: false, onPress: () => requestConnect(item.id) };
        case "pending-them":
          return { text: "Pending", disabled: true, onPress: () => {} };
        case "pending-me":
          return { text: "Accept", disabled: false, onPress: () => {} };
        default:
          return { text: "", disabled: false, onPress: () => {} };
      }
    };

    const buttonProps = getButtonProps();

    return (
      <TouchableOpacity onPress={() => handleCardPress(item.id)}>
        <View className="bg-white rounded-2xl shadow-sm mt-4 mx-4 overflow-hidden p-4">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {item.first_name} {item.last_name}
              </Text>
              <Text className="text-sm font-medium text-gray-600">
                {item.specialization || "General"}
              </Text>
            </View>
            {item.status !== "connected" && (
              <View className={`px-3 py-1 rounded-full ${statusColors[item.status]}`}>
                <Text className="text-xs font-medium capitalize">{item.status}</Text>
              </View>
            )}
          </View>

          {buttonProps.text && (
            <View className="mt-4 flex-row justify-end">
              <Pressable
                className="bg-gray-200 px-4 py-2 rounded-full flex-row items-center"
                onPress={buttonProps.onPress}
                disabled={buttonProps.disabled}
              >
                <Text className="ml-2 text-gray-700 font-medium">{buttonProps.text}</Text>
              </Pressable>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={searchList || []}
        numColumns={1}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <IDuotoneBlack/>
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for Your Ideal Home
              </Text>
              <Bell/>
            </View>
            <Search
              searchQuery={searchQuery}
              onSearchChange={(text) => {
                setSearchQuery(text); // Update search query without dismissing the keyboard
              }}
              onFilterPress={() => {
                // Handle filter press if needed
              }}
            />

            <View className="mt-5">
              <Filters />

              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {searchList ? searchList.length : 0} Properties
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Explore;