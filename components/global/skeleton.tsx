import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  withSequence
} from "react-native-reanimated";
import { useEffect } from "react";

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className = ""}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[
        {
          backgroundColor: "#E5E7EB",
          height: "100%",
          width: "100%"
        },
        animatedStyle
      ]}
    />
  );
};