import Svg, {
  ClipPath,
  Defs,
  G,
  Rect,
} from 'react-native-svg';

type EmptyProps = {
  primaryColor?: string;
  secondaryColor?: string;
};

export const Empty = ({ primaryColor = "#0061FF", secondaryColor = "#666876" }: EmptyProps) => {
  return (
    <Svg
      width="394"
      height="293"
      viewBox="0 0 394 293"
      fill="none"
    >
      <G opacity="0.74">
        <G clipPath="url(#clip0_8182_21406)">
          <Rect
            width="288.161"
            height="231.765"
            rx="10.8157"
            fill={primaryColor}
          />
          <Rect
            width="288.933"
            height="143.694"
            fill={secondaryColor}
          />
          <Rect
            x="17.3824"
            y="160.304"
            width="121.29"
            height="32.4471"
            rx="5.79412"
            fill="#262626"
            stroke="#343434"
            strokeWidth="0.772549"
          />
        </G>
        <Rect
          x="0.386275"
          y="0.386275"
          width="287.388"
          height="230.992"
          rx="10.4294"
          stroke={secondaryColor}
          strokeWidth="0.772549"
        />
      </G>
      <G>
        <G clipPath="url(#clip1_8182_21406)">
          <Rect
            x="48.6704"
            y="27.0391"
            width="288.161"
            height="231.765"
            rx="10.8157"
            fill={primaryColor}
            fillOpacity="0.7"
          />
          <Rect
            x="48.6704"
            y="27.0391"
            width="288.933"
            height="143.694"
            fill={secondaryColor}
            fillOpacity="0.45"
          />
          <Rect
            x="66.0528"
            y="187.343"
            width="121.29"
            height="32.4471"
            rx="5.79412"
            fill="#262626"
            stroke="#343434"
            strokeWidth="0.772549"
          />
        </G>
        <Rect
          x="49.0567"
          y="27.4253"
          width="287.388"
          height="230.992"
          rx="10.4294"
          stroke={secondaryColor}
          strokeWidth="0.772549"
        />
      </G>
      <G>
        <G clipPath="url(#clip2_8182_21406)">
          <Rect
            x="105.839"
            y="61.0312"
            width="288.161"
            height="231.765"
            rx="10.8157"
            fill={primaryColor}
            fillOpacity="0.32"
          />
          <Rect
            x="105.839"
            y="61.0312"
            width="288.933"
            height="143.694"
            fill={secondaryColor}
            fillOpacity="0.45"
          />
          <Rect
            x="122.835"
            y="220.949"
            width="122.063"
            height="33.2196"
            rx="6.18039"
            fill="#262626"
            fillOpacity="0.25"
          />
          <Rect
            x="123.222"
            y="221.335"
            width="121.29"
            height="32.4471"
            rx="5.79412"
            stroke={secondaryColor}
            fillOpacity="0.09"
            strokeWidth="0.772549"
          />
        </G>
        <Rect
          x="106.226"
          y="61.4175"
          width="287.388"
          height="230.992"
          rx="10.4294"
          stroke={secondaryColor}
          strokeWidth="0.772549"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8182_21406">
          <Rect width="288.161" height="231.765" rx="10.8157" fill="white" />
        </ClipPath>
        <ClipPath id="clip1_8182_21406">
          <Rect
            x="48.6704"
            y="27.0391"
            width="288.161"
            height="231.765"
            rx="10.8157"
            fill="white"
          />
        </ClipPath>
        <ClipPath id="clip2_8182_21406">
          <Rect
            x="105.839"
            y="61.0312"
            width="288.161"
            height="231.765"
            rx="10.8157"
            fill="white"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};