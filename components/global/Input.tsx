import { Check } from "@/constants/icons";
import { useState, useCallback } from "react";
import { View, TextInput, Pressable, ActivityIndicator, Image } from "react-native";

interface InputProps {
  onSubmit: (text: string) => void;
  isSubmitting?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export const Input = ({ onSubmit,className, isSubmitting = false, placeholder = "Write ...", maxLength = 1000 }: InputProps) => {
  const [text, setText] = useState("");
  const handleSubmit = useCallback(() => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  }, [text, onSubmit]);

  return (
    <View className={`absolute bottom-0 left-0 right-0 p-4 bg-transparent ${className}`}>
      <View className="flex-row items-center gap-2 space-x-4 bg-white rounded-full shadow-lg p-2">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2"
          placeholder={placeholder}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={maxLength}
        />
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting || !text.trim()}
          className={`rounded-full p-2 ${
            isSubmitting || !text.trim() ? "bg-gray-500" : "bg-purple-500"
          }`}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Check/>
          )}
        </Pressable>
      </View>
    </View>
  );
};