import React, { useState, useRef, useEffect } from "react";
import { View, Pressable, Text, Image, Animated } from "react-native";
import icons from "@/constants/icons";

interface DropdownMenuProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const DropdownMenu = ({ options, onSelect, placeholder = "Select an option" }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);
  const animation = useRef(new Animated.Value(0)).current; // Controls height and opacity

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      // Animate dropdown opening
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      // Animate dropdown closing
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen]);

  const handleSelect = (option: { label: string; value: string }) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  // Interpolate height and opacity for smooth animation
  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, options.length * 50], // Adjust based on the number of options
  });

  const dropdownOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View className="relative w-[90%] max-w-[400px]">
      <Pressable
        onPress={toggleMenu}
        className="flex-row items-center justify-between bg-white rounded-full shadow-lg p-3"
      >
        <Text className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-600">
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Image
          source={isOpen ? icons.backArrow : icons.rightArrow}
          className="w-6 h-6 ml-2"
          tintColor="#6B7280"
        />
      </Pressable>

      <Animated.View
        className="absolute top-16 left-0 right-0 bg-white rounded-lg shadow-lg overflow-hidden"
        style={{
          height: dropdownHeight,
          opacity: dropdownOpacity,
        }}
      >
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => handleSelect(option)}
            className="px-4 py-3 border-b border-gray-200 last:border-b-0"
          >
            <Text className="text-gray-700">{option.label}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
};