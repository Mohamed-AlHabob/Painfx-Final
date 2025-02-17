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
<MaterialTopTabs>
<MaterialTopTabs.Screen name="index" options={{ title: "All" }} />
<MaterialTopTabs.Screen name="experiences" options={{ title: "Experiences" }} />
<MaterialTopTabs.Screen name="reviews" options={{ title: "Reviews" }} />
</MaterialTopTabs>
  );
};

export default Layout;