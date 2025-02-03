import { withLayoutContext } from "expo-router";
import {
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import type { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

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
    >
      <MaterialTopTabs.Screen name="index" options={{ title: "All" }} />
      <MaterialTopTabs.Screen name="recent" options={{ title: "Recent" }} />
      <MaterialTopTabs.Screen name="foryou" options={{ title: "For You" }} />
      <MaterialTopTabs.Screen name="nearby" options={{ title: "Nearby" }} />
    </MaterialTopTabs>
  );
};

export default Layout;
