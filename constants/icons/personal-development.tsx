import Svg, { Path } from 'react-native-svg';

export const PersonalDevelopment = ({ size= 16, strokeColor = "#FAFAFA", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M3.33325 13.3334H12.6666M1.33325 2.66675L3.33325 10.6667H12.6666L14.6666 2.66675L10.6666 7.33341L7.99992 2.66675L5.33325 7.33341L1.33325 2.66675Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
