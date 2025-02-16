import Svg, { Path, Rect } from 'react-native-svg';
export const BriefCaseDuoToneBlack = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"

    >
      <Rect x="2" y="5" width="20" height="17" rx="3" fill="#333337" />
      <Rect x="10" y="12" width="4" height="2" rx="1" fill="#43CD36" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.24567 3.88583L7.8 5H5C3.34315 5 2 6.34315 2 8V10C2 11.6569 3.34315 13 5 13H8C8 11.3431 9.34315 10 11 10H13C14.6569 10 16 11.3431 16 13H19C20.6569 13 22 11.6569 22 10V8C22 6.34315 20.6569 5 19 5H16.2L15.7543 3.88583C15.2987 2.74685 14.1956 2 12.9689 2H11.0311C9.80439 2 8.70126 2.74685 8.24567 3.88583ZM12.9689 4H11.0311C10.6222 4 10.2545 4.24895 10.1026 4.62861L9.95407 5H14.0459L13.8974 4.62861C13.7455 4.24895 13.3778 4 12.9689 4Z"
        fill="#7A7775"
      />
    </Svg>
  )
}
