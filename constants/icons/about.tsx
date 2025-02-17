import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const About = ({ color = '#333337', size = 24, ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Circle cx="12" cy="12" r="10" fill={color} /> {/* Use the fill prop */}
      <Circle cx="12" cy="18" r="1" fill="#fff" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8C11.1307 8 10.3886 8.5551 10.1135 9.33325C9.92948 9.85396 9.35815 10.1269 8.83744 9.94284C8.31672 9.75879 8.0438 9.18747 8.22784 8.66675C8.77648 7.11451 10.2568 6 12 6C14.2091 6 16 7.79086 16 10C16 11.8638 14.7252 13.4299 13 13.874V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13C11 12.4477 11.4477 12 12 12C13.1045 12 14 11.1046 14 10C14 8.89543 13.1045 8 12 8Z"
        fill="#fff"
      />
    </Svg>
  );
};