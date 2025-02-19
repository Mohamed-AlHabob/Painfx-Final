import Svg, { Path } from 'react-native-svg';

export const Business = ({ size = 16, color = "#FAFAFA", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      accessible={true}
      accessibilityLabel="Business Icon"
      {...props}
    >
      <Path
        d="M10.6666 14V3.33333C10.6666 2.97971 10.5261 2.64057 10.2761 2.39052C10.026 2.14048 9.68687 2 9.33325 2H6.66658C6.31296 2 5.97382 2.14048 5.72378 2.39052C5.47373 2.64057 5.33325 2.97971 5.33325 3.33333V14M2.66659 4.66667H13.3333C14.0696 4.66667 14.6666 5.26362 14.6666 6V12.6667C14.6666 13.403 14.0696 14 13.3333 14H2.66659C1.93021 14 1.33325 13.403 1.33325 12.6667V6C1.33325 5.26362 1.93021 4.66667 2.66659 4.66667Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
