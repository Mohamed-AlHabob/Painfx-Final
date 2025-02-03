import { withLayoutContext } from "expo-router";
import {
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import type { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useColorScheme } from 'nativewind';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen name="index" options={{ title: "All" }} />
      <MaterialTopTabs.Screen name="recent" options={{ title: "Recent" }} />
      <MaterialTopTabs.Screen name="foryou" options={{ title: "For You" }} />
      <MaterialTopTabs.Screen name="nearby" options={{ title: "Nearby" }} />
    </MaterialTopTabs>
  );
};

export default Layout;
