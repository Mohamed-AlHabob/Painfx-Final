import React from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import icons from "@/constants/icons";

interface SearchProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterPress?: () => void;
}

const Search = ({ searchQuery, onSearchChange, onFilterPress }: SearchProps) => {
  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>

      <TouchableOpacity onPress={onFilterPress}>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;