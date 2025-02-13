import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import icons from "@/constants/icons";
import Search from "@/components/Search";
import Filters from "@/components/global/Filters";
import NoResults from "@/components/global/NoResults";
import { useGlobalStore } from "@/core/store";
import { Input } from "@/components/global/Input";


const Explore = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { searchList, searchUsers, requestConnect } = useGlobalStore();

  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery);
    } else {
      useGlobalStore.setState({ searchList: null });
    }
  }, [searchQuery]);

  const handleCardPress = (id: string) => router.push(`/profile/${id}`);

  const renderUserItem = ({ item }) => {
    if (item.status === "connected") {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icons.backArrow} className="size-5" />
          <Text>{item.first_name}</Text>
        </View>
      );
    }
  
    const data = {
      text: "",
      disabled: false,
      onPress: () => {},
    };
  
    switch (item.status) {
      case "no-connection":
        data.text = "Connect";
        data.disabled = false;
        data.onPress = () => requestConnect(item.id);
        break;
      case "pending-them":
        data.text = "Pending";
        data.disabled = true;
        data.onPress = () => {};
        break;
      case "pending-me":
        data.text = "Accept";
        data.disabled = false;
        data.onPress = () => {}; 
        break;
      default:
        break;
    }
  
    return (
      <TouchableOpacity onPress={() => handleCardPress(item.id)}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text>{item.first_name} {item.last_name}</Text>
          {data.text && (
            <TouchableOpacity onPress={data.onPress} disabled={data.disabled}>
              <Text style={{ color: data.disabled ? "gray" : "blue" }}>{data.text}</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={searchList || []}
      numColumns={1} // Changed to 1 column for better readability
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
              <Image source={icons.backArrow} className="size-5" />
            </TouchableOpacity>
      
            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
              Search for Your Ideal Home
            </Text>
            <Image source={icons.bell} className="w-6 h-6" />
          </View>
          <Search
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
  );
};

export default Explore;