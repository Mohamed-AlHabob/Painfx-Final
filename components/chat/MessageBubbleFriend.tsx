import { Text, View } from "react-native";
import MessageTypingAnimation from "./MessageTypingAnimation"; // Import typing animation
import { Thumbnail } from "../Thumbnail";

const MessageBubbleFriend = ({ text = '', friend, typing = false }) => {
  return (
    <View style={{ flexDirection: 'row', padding: 4, paddingLeft: 16 }}>
      <Thumbnail url={friend.thumbnail} size={42} />
      <View
        style={{
          backgroundColor: '#d0d2db',
          borderRadius: 21,
          maxWidth: '75%',
          paddingHorizontal: 16,
          paddingVertical: 12,
          justifyContent: 'center',
          marginLeft: 8,
          minHeight: 42
        }}
      >
        {typing ? (
          <View style={{ flexDirection: 'row' }}>
            <MessageTypingAnimation offset={0} />
            <MessageTypingAnimation offset={1} />
            <MessageTypingAnimation offset={2} />
          </View>
        ) : (
          <Text style={{ color: '#202020', fontSize: 16, lineHeight: 18 }}>
            {text}
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default MessageBubbleFriend;
