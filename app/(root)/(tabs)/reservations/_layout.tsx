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
        tabBarIndicatorStyle: { backgroundColor: "#4a90e2", height: 2 },
        tabBarActiveTintColor: "#4a90e2",
        tabBarInactiveTintColor: "#888888",
      }}
      >
      <MaterialTopTabs.Screen name="index" options={{ title: "Recents" }} />
      <MaterialTopTabs.Screen name="complete" options={{ title: "Complete" }} />
      <MaterialTopTabs.Screen name="canceled" options={{ title: "Canceled" }} />
    </MaterialTopTabs>
  );
};

export default Layout;