import { thumbnail } from "@/core/utils";
import { View, Image } from "react-native";


const Thumbnail = ({ url, size }) => {
  return (
    <Image
      source={thumbnail(url)}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#e0e0e0",
      }}
    />
  );
};

const Cell = ({ children }) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
        height: 106,
      }}
    >
      {children}
    </View>
  );
};

export { Thumbnail, Cell };
