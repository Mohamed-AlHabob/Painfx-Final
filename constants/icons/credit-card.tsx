import Svg, { Path, Rect } from "react-native-svg";

export const CreditCard = ({ size = 24, color = "#333337", highlightColor = "#4BDE70", strokeWidth = 1, ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      accessible={true}
      accessibilityLabel="Credit Card Icon"
      {...props}
    >
      {/* Background of the Credit Card */}
      <Rect x="2" y="4" width="20" height="16" rx="3" fill={color} />
      
      {/* Top Stripe */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 10H2V8H22V10Z"
        fill={highlightColor}
      />
      
      {/* Bottom Button */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 15C4 14.4477 4.44772 14 5 14H11C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16H5C4.44772 16 4 15.5523 4 15Z"
        fill={highlightColor}
      />
    </Svg>
  );
};
