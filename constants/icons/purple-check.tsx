import Svg, { Path } from 'react-native-svg';

export const PurpleCheck = ({ width = 16, height = 17, strokeColor = "#FAFAFA", fillColor = "#8723D5", ...props }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <Path
        d="M0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5Z"
        fill={fillColor}  // Customize fill color
      />
      <Path
        d="M12.6663 5L6.24967 11.4167L3.33301 8.5"
        stroke={strokeColor}  // Customize stroke color
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
