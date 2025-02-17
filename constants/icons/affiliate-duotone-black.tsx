import Svg, { Circle, Path } from 'react-native-svg';

export const AffiliateDuoToneBlack = ({ 
  primaryFill = "#43CD36", 
  secondaryFill = "#333337", 
  width = 24, 
  height = 25, 
  ...props 
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      accessible={true}
      accessibilityLabel="Affiliate Icon"
      {...props}
    >
      <Circle cx="14" cy="7.5" r="4" fill={primaryFill} />
      <Path
        d="M12 13.5C8.68629 13.5 6 16.1863 6 19.5C6 20.6046 6.89543 21.5 8 21.5H20C21.1046 21.5 22 20.6046 22 19.5V18.5C22 15.7386 19.7614 13.5 17 13.5H12Z"
        fill={primaryFill}
      />
      <Path
        d="M7 13.5C4.23858 13.5 2 15.7386 2 18.5V19.5C2 20.6046 2.89543 21.5 4 21.5H16C17.1046 21.5 18 20.6046 18 19.5V18.5C18 15.7386 15.7614 13.5 13 13.5H7Z"
        fill={secondaryFill}
      />
      <Circle cx="10" cy="7.5" r="4" fill={secondaryFill} />
    </Svg>
  );
};
