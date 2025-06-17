import { icon } from '@/constants/icon';
import { TabRouteName } from '@/interface/tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';

interface TabBarButtonProps {
  routeName: TabRouteName;
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  label: string;
}

const TabBarButton = ({ routeName, onPress, onLongPress, isFocused, label }: TabBarButtonProps) => {
  const isDark = useColorScheme() === 'dark';
  const color = isFocused ? '#4FC3F7' : isDark ? '#fff' : '#000';

  // Try to get icon function from your icon map
  const IconComponent = icon[routeName]?.({ color }) ?? (
    <Ionicons name='alert-circle-outline' size={24} color={color} />
  );

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tabBarItem}>
      {IconComponent}
      <Text style={{ color }}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export default TabBarButton;
