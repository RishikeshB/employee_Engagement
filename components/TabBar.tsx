import { TabRouteName } from "@/interface/tabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, useColorScheme, View } from "react-native";
import TabBarButton from "./TabBarButton";

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = getStyles(isDark);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as TabRouteName}
            label={label as string}
          />
        );
      })}
    </View>
  );
}

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    tabBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isDark ? "#000" : "#fff",
      paddingVertical: 15,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
    },
  });
}

export default TabBar;
