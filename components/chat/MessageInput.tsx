import { TextInput, TouchableOpacity, View,Text } from "react-native";

const MessageInput = ({ message, setMessage, onSend }) => {
  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        placeholder="Message..."
        placeholderTextColor="#909090"
        value={message}
        onChangeText={setMessage}
        style={{
          flex: 1,
          paddingHorizontal: 18,
          borderWidth: 1,
          borderRadius: 25,
          borderColor: '#d0d0d0',
          backgroundColor: 'white',
          height: 50
        }}
      />
      <TouchableOpacity onPress={onSend}>
        <Text style={{ marginHorizontal: 12 }}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
