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
      <MaterialTopTabs.Screen name="requests" options={{ title: "Requests" }} />
    </MaterialTopTabs>
  );
};

export default Layout;
