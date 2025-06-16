import { icon } from "@/constants/icon";
import { TabRouteName } from "@/interface/tabs";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

interface TabBarButtonProps {
  routeName: TabRouteName;
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: string;
}

const TabBarButton = ({
  routeName,
  onPress,
  onLongPress,
  isFocused,
  label,
}: TabBarButtonProps) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      {icon[routeName]({
        color: isFocused ? "#4FC3F7" : isDark ? "#fff" : "#000",
      })}
      <Text style={{ color: isFocused ? "#4FC3F7" : isDark ? "#fff" : "#000" }}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default TabBarButton;
