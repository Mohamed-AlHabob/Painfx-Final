import Svg, { Circle, Path } from "react-native-svg";

export const IDuotoneBlack = ({
  width = 24,
  height = 24,
  circleColor = "#333337",
  pathColor = "#43CD36",
  smallCircleColor = "#7A7775",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" fill={circleColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 11C12.5523 11 13 11.4477 13 12V17.0009C13 17.5532 12.5523 18.0009 12 18.0009C11.4477 18.0009 11 17.5532 11 17.0009V12C11 11.4477 11.4477 11 12 11Z"
        fill={pathColor}
      />
      <Circle cx="12" cy="8" r="1" fill={smallCircleColor} />
    </Svg>
  );
};
