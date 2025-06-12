import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExploreScreen = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    Animated.timing(heightAnim, {
      toValue: showDropdown ? 0 : 40,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968757.png' }} // Microsoft Teams icon
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>Itunuoluwa Abidoye</Text>
          <Text style={styles.handle}>@Itunuoluwa</Text>
        </View>
        <Feather name='edit-2' size={18} color='white' style={styles.editIcon} />
      </TouchableOpacity>

      {/* Animated Dropdown */}
      <Animated.View style={[styles.dropdown, { height: heightAnim }]}>
        {showDropdown && <Text style={styles.email}>itunuoluwa@example.com</Text>}
      </Animated.View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3f51b5', // blue
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  handle: {
    color: '#e0e0e0',
    fontSize: 13,
  },
  editIcon: {
    marginLeft: 8,
  },
  dropdown: {
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  email: {
    fontSize: 14,
    paddingVertical: 10,
    color: '#333',
  },
});
