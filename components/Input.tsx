import { View, Text, TextInput } from "react-native";

const Input = ({
  title,
  value,
  error,
  setValue,
  setError,
  secureTextEntry = false,
}) => {
  const handleTextChange = (text) => {
    setValue(text);
    if (error) {
      setError(""); // Clear error when the user starts typing
    }
  };

  return (
    <View style={{ marginBottom: 12 }}>
      {/* Display the title or the error message */}
      <Text
        style={{
          color: error ? "#ff5555" : "#70747a", // Change color based on error
          marginVertical: 6,
          paddingLeft: 16,
        }}
      >
        {error || title} {/* Display error message if exists */}
      </Text>

      {/* TextInput field */}
      <TextInput
        autoCapitalize="none" // Prevent capitalizing of the first letter
        autoComplete="off" // Disable autocomplete to avoid suggestions
        value={value}
        onChangeText={handleTextChange}
        secureTextEntry={secureTextEntry} // Use secure text entry for password fields
        style={{
          backgroundColor: "#e1e2e4", // Light gray background color
          borderWidth: 1,
          borderColor: error ? "#ff5555" : "transparent", // Red border on error
          borderRadius: 26,
          height: 52,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
      />
    </View>
  );
};

export default Input;
