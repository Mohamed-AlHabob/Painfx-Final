import { withLayoutContext } from "expo-router";
import {
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import type { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useGlobalStore } from "@/core/store";
import { useEffect } from "react";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const CostomLayout = () => {
  const socketConnect = useGlobalStore(state => state.socketConnect)
  const socketClose = useGlobalStore((state: { socketClose: any; }) => state.socketClose)
  useEffect(() => {
		socketConnect()
		return () => {
			socketClose()
		}
	}, [])
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
      <MaterialTopTabs.Screen name="test" options={{ title: "Test" }} />
    </MaterialTopTabs>
  );
};

export default CostomLayout;
