import Svg, { Path } from 'react-native-svg';

export const Logout = ({
  width = 16,
  height = 16,
  strokeColor = "#4BDE70", // Default stroke color
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M10 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H10M6.66667 11.3333L10 8M10 8L6.66667 4.66667M10 8H2"
        stroke={strokeColor} // Apply customizable stroke color
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
