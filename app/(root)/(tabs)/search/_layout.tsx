import { withLayoutContext } from 'expo-router';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions,
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "#6200ee", height: 2 },
      }}
    ></MaterialTopTabs>
  );
};

export default Layout;