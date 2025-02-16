import Svg, { Path, Rect } from "react-native-svg"

export const CreditCard = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
    >
      <Rect x="2" y="4" width="20" height="16" rx="3" fill="#333337" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 10H2V8H22V10Z"
        fill="#4BDE70"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 15C4 14.4477 4.44772 14 5 14H11C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16H5C4.44772 16 4 15.5523 4 15Z"
        fill="#43CD36"
      />
    </Svg>
  )
}
