import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Reservation = ({ color = '#000000', size = 24, ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM12 20C7.58985 20 4 16.4102 4 12C4 7.58985 7.58985 4 12 4C16.4102 4 20 7.58985 20 12C20 16.4102 16.4102 20 12 20Z"
        fill={color} // Use the fill prop for color
      />
      <Path
        d="M16 10L12 14L8 10"
        stroke={color} // You can also use dynamic color here
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
