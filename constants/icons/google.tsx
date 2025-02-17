import Svg, { Defs, G, Path, LinearGradient, Stop } from 'react-native-svg';
import React from 'react';

export const Google = ({
  width = 24,
  height = 24,
  blueColor = "#4285F4",
  greenColor = "#34A853",
  yellowColor = "#FBBC05",
  redColor = "#EA4335",
  ...props
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <G>
        <Path
          d="M20.64 12.2045C20.64 11.5645 20.5827 10.9445 20.4764 10.3445H12V13.8745H16.8436C16.635 14.9845 15.9009 15.9245 14.7955 16.5645V18.8195H17.7518C19.4582 17.2545 20.64 14.9445 20.64 12.2045Z"
          fill={blueColor}
        />
        <Path
          d="M12 21C14.43 21 16.4673 20.1941 17.7518 18.8195L14.7955 16.5645C13.9618 17.1014 13.0436 17.4205 12 17.4205C9.65591 17.4205 7.67182 15.8373 6.96409 13.71H3.90455V16.0418C5.18045 18.9832 8.34818 21 12 21Z"
          fill={greenColor}
        />
        <Path
          d="M6.96409 13.71C6.78409 13.17 6.68182 12.5932 6.68182 12C6.68182 11.4068 6.78409 10.83 6.96409 10.29V7.95818H3.90455C3.32727 9.17318 3 10.5477 3 12C3 13.4523 3.32727 14.8268 3.90455 16.0418L6.96409 13.71Z"
          fill={yellowColor}
        />
        <Path
          d="M12 6.57955C13.3214 6.57955 14.5077 7.03364 15.4405 7.92545L18.0218 5.34409C16.4632 3.89182 14.4259 3 12 3C8.34818 3 5.18045 5.01682 3.90455 7.95818L6.96409 10.29C7.67182 8.16273 9.65591 6.57955 12 6.57955Z"
          fill={redColor}
        />
      </G>
      <Defs>
        <LinearGradient id="paint0_linear" x1="12" y1="10.3445" x2="20.64" y2="18.8195" gradientUnits="userSpaceOnUse">
          <Stop stopColor={blueColor} />
          <Stop offset="1" stopColor={blueColor} />
        </LinearGradient>
        <LinearGradient id="paint1_linear" x1="3.90455" y1="16.0418" x2="17.7518" y2="18.8195" gradientUnits="userSpaceOnUse">
          <Stop stopColor={greenColor} />
          <Stop offset="1" stopColor={greenColor} />
        </LinearGradient>
        <LinearGradient id="paint2_linear" x1="3" y1="12" x2="6.96409" y2="13.71" gradientUnits="userSpaceOnUse">
          <Stop stopColor={yellowColor} />
          <Stop offset="1" stopColor={yellowColor} />
        </LinearGradient>
        <LinearGradient id="paint3_linear" x1="3.90455" y1="7.95818" x2="18.0218" y2="5.34409" gradientUnits="userSpaceOnUse">
          <Stop stopColor={redColor} />
          <Stop offset="1" stopColor={redColor} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
