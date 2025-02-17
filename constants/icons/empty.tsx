import Svg, { ClipPath, Defs, G, Rect } from 'react-native-svg';

type EmptyProps = {
  primaryColor?: string;
  secondaryColor?: string;
};

const RECT_OPACITY = 0.7;
const RECT_RADIUS = 10.8157;
const RECT_STROKE_WIDTH = 0.772549;

export const Empty = ({ primaryColor = "#0061FF", secondaryColor = "#666876" }: EmptyProps) => (
  <Svg width="394" height="293" viewBox="0 0 394 293" fill="none">
    <Defs>
      <ClipPath id="clip0">
        <Rect width="288.161" height="231.765" rx={RECT_RADIUS} fill="white" />
      </ClipPath>
      <ClipPath id="clip1">
        <Rect x="48.6704" y="27.0391" width="288.161" height="231.765" rx={RECT_RADIUS} fill="white" />
      </ClipPath>
      <ClipPath id="clip2">
        <Rect x="105.839" y="61.0312" width="288.161" height="231.765" rx={RECT_RADIUS} fill="white" />
      </ClipPath>
    </Defs>

    <G opacity="0.74">
      <G clipPath="url(#clip0)">
        <Rect width="288.161" height="231.765" rx={RECT_RADIUS} fill={primaryColor} />
        <Rect width="288.933" height="143.694" fill={secondaryColor} />
        <Rect x="17.3824" y="160.304" width="121.29" height="32.4471" rx="5.79412" fill="#262626" stroke="#343434" strokeWidth={RECT_STROKE_WIDTH} />
      </G>
      <Rect x="0.386275" y="0.386275" width="287.388" height="230.992" rx="10.4294" stroke={secondaryColor} strokeWidth={RECT_STROKE_WIDTH} />
    </G>

    <G>
      <G clipPath="url(#clip1)">
        <Rect x="48.6704" y="27.0391" width="288.161" height="231.765" rx={RECT_RADIUS} fill={primaryColor} fillOpacity={RECT_OPACITY} />
        <Rect x="48.6704" y="27.0391" width="288.933" height="143.694" fill={secondaryColor} fillOpacity="0.45" />
        <Rect x="66.0528" y="187.343" width="121.29" height="32.4471" rx="5.79412" fill="#262626" stroke="#343434" strokeWidth={RECT_STROKE_WIDTH} />
      </G>
      <Rect x="49.0567" y="27.4253" width="287.388" height="230.992" rx="10.4294" stroke={secondaryColor} strokeWidth={RECT_STROKE_WIDTH} />
    </G>

    <G>
      <G clipPath="url(#clip2)">
        <Rect x="105.839" y="61.0312" width="288.161" height="231.765" rx={RECT_RADIUS} fill={primaryColor} fillOpacity="0.32" />
        <Rect x="105.839" y="61.0312" width="288.933" height="143.694" fill={secondaryColor} fillOpacity="0.45" />
        <Rect x="122.835" y="220.949" width="122.063" height="33.2196" rx="6.18039" fill="#262626" fillOpacity="0.25" />
        <Rect x="123.222" y="221.335" width="121.29" height="32.4471" rx="5.79412" stroke={secondaryColor} fillOpacity="0.09" strokeWidth={RECT_STROKE_WIDTH} />
      </G>
      <Rect x="106.226" y="61.4175" width="287.388" height="230.992" rx="10.4294" stroke={secondaryColor} strokeWidth={RECT_STROKE_WIDTH} />
    </G>
  </Svg>
);
