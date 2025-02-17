import Svg, { Path } from 'react-native-svg';
export const ZapDouToneBlack = ({ fillColor = "#43CD36", width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.0034 4.69718C15.451 2.17759 12.2728 0.692578 10.6273 2.6524L3.58895 11.0352C2.22322 12.6618 3.37965 15.1428 5.50357 15.1428H9.7351L8.99616 19.3026C8.54859 21.8222 11.7267 23.3073 13.3722 21.3474L20.4107 12.9646C21.7764 11.338 20.62 8.85708 18.496 8.85708H14.2645L15.0034 4.69718Z"
        fill={fillColor}
      />
    </Svg>
  );
};

