import Svg, { Defs, G, Path } from "react-native-svg";

export const Fitness = ({
  width = 16,
  height = 16,
  strokeColor = "#FAFAFA",
  strokeWidth = 1
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          d="M4.33325 4.33325L11.6666 11.6666M13.9999 13.9999L13.3333 13.3333M1.99992 1.99992L2.66659 2.66659M11.9999 14.6666L14.6666 11.9999M1.33325 3.99992L3.99992 1.33325M1.99992 6.66658L6.66658 1.99992M9.33325 13.9999L13.9999 9.33325"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </Defs>
    </Svg>
  );
};
