import type React from "react"
import { View, Image, Text } from "react-native"

interface AvatarProps {
  src?: string | null
  fallback?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

export const Avatar: React.FC<AvatarProps> = ({ src, fallback, size = "md", className = "" }) => {
  const sizeClass = sizeMap[size]

  if (src) {
    return <Image source={{ uri: src }} className={`rounded-full ${sizeClass} ${className}`} />
  }

  return (
    <View className={`rounded-full bg-secondary items-center justify-center ${sizeClass} ${className}`}>
      <Text
        className="text-primary font-semibold"
        style={{ fontSize: size === "sm" ? 14 : size === "md" ? 16 : 18 }}
      >
        {fallback ? fallback.charAt(0).toUpperCase() : "?"}
      </Text>
    </View>
  )
}

