import { useEffect } from "react"
import { Animated, Text, type TextProps } from "react-native"

interface AnimatedTextProps extends TextProps {
  children: string
  style?: any
}

const AnimatedText = ({ children, style, ...props }: AnimatedTextProps) => {
  const animatedValue = new Animated.Value(0)

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start()
  }, [animatedValue]) // Added animatedValue to dependencies

  return (
    <Animated.Text
      style={[
        style,
        {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ]}
      {...props}
    >
      {children}
    </Animated.Text>
  )
}

export default AnimatedText

