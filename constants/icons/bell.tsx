import Svg, { Circle, Path } from 'react-native-svg';

export const Bell = ({ bellColor = "#333337", notificationColor = "#43CD36", size = 24, ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      accessible={true}
      accessibilityLabel="Notification Bell Icon"
      {...props}
    >
      <Circle cx="12.4443" cy="18" r="4" fill={notificationColor} />
      <Path
        d="M21.0301 18H3.84841C3.07296 18 2.44434 17.3714 2.44434 16.5959C2.44434 16.2151 2.59904 15.8506 2.87297 15.586L3.90193 14.5922C4.29362 14.2139 4.51411 13.6922 4.51248 13.1476L4.50301 9.9946C4.48977 5.58319 8.06222 2 12.4737 2C16.8757 2 20.4443 5.56859 20.4443 9.97067L20.4443 13.1716C20.4443 13.702 20.655 14.2107 21.0301 14.5858L22.0301 15.5858C22.2953 15.851 22.4443 16.2107 22.4443 16.5858C22.4443 17.3668 21.8112 18 21.0301 18Z"
        fill={bellColor}
      />
    </Svg>
  );
};
