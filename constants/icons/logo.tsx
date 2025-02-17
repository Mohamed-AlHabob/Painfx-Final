import { Image } from "react-native";
import logo from "@/assets/images/icon.png"; // Import the image correctly

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export const Logo = ({ height = 40, width = 40, className }: LogoProps) => {
  return (
    <Image
      height={height}
      width={width}
      source={logo}
      className={className}
    />
  );
};

export const LogoDark = ({ height = 40, width = 40, className }: LogoProps) => {
  return (
    <Image
      height={height}
      width={width}
      source={logo} 
      className={className}
    />
  );
};