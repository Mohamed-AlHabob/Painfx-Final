import Svg, { Path } from "react-native-svg";

export const Compass = ({ size = 24, color = "#333337", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      accessible={true}
      accessibilityLabel="Compass Icon"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
        fill={color}
      />
      <Path
        d="M10.3512 9.6808L15.4401 7.77247C16.244 7.47101 17.029 8.25604 16.7275 9.05992L14.8192 14.1488C14.6164 14.6896 14.1896 15.1164 13.6488 15.3192L8.55992 17.2275C7.75604 17.529 6.97101 16.744 7.27247 15.9401L9.1808 10.8512C9.38361 10.3104 9.81036 9.88361 10.3512 9.6808Z"
        fill="#7A7775"
      />
    </Svg>
  );
};
