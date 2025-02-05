import { Text, View } from "react-native";
import { Thumbnail } from "../Thumbnail";


const MessageHeader = ({ friend }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Thumbnail url={friend.thumbnail} size={30} />
      <Text style={{ color: '#202020', marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>
        {friend.name}
      </Text>
    </View>
  );
};

export default MessageHeader;
