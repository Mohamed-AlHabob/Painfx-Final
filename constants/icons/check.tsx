import Svg, { Path } from 'react-native-svg';

export const Check = ({ size = 16, color = "#43CD36", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      accessible={true}
      accessibilityLabel="Check Icon"
      {...props}
    >
      <Path
        d="M7.47266 11.558L7.47264 11.558C7.44602 11.5987 7.40279 11.6259 7.35419 11.6321C7.3059 11.6383 7.25722 11.623 7.22104 11.5901C7.22104 11.5901 7.22103 11.5901 7.22102 11.5901L4.28771 8.92343C4.21961 8.86151 4.21458 8.75611 4.2765 8.68799C4.33842 8.61988 4.44383 8.61487 4.51193 8.67678L4.51194 8.67679L6.86673 10.8175L7.30064 11.212L7.62155 10.7212L11.727 4.44223C11.7774 4.36518 11.8807 4.34358 11.9577 4.39394C12.0348 4.44435 12.0563 4.54765 12.006 4.62464L12.4245 4.89827L12.006 4.62465L7.47266 11.558Z"
        stroke={color}
      />
    </Svg>
  );
};
