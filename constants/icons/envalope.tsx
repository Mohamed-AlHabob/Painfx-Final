import Svg, { Path, Rect } from 'react-native-svg';

export const Envelope = ({ width = "24", height = "25", rectColor = "#333337", pathColor = "#7A7775" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Rect x="2" y="4.5" width="20" height="16" rx="3" fill={rectColor} />
      <Path
        d="M10.91 12.7915L2 7C2 5.61929 3.11929 4.5 4.5 4.5H19.5C20.8807 4.5 22 5.61929 22 7L13.09 12.7915C12.4272 13.2223 11.5728 13.2223 10.91 12.7915Z"
        fill={pathColor}
      />
    </Svg>
  );
};
