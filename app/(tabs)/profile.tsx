import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';
import { Pressable, ScrollView } from 'react-native-gesture-handler';

export default function ProfileScreen() {
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);

  const profileOptions = [
    {
      icon: 'user',
      label: 'My Account',
      subLabel: 'Make changes to your account',
      alert: true,
    },
    {
      icon: 'users',
      label: 'Saved Beneficiary',
      subLabel: 'Manage your saved account',
    },
    {
      icon: 'lock',
      label: 'Face ID / Touch ID',
      subLabel: 'Manage your device security',
      toggle: true,
    },
    {
      icon: 'shield',
      label: 'Two-Factor Authentication',
      subLabel: 'Further secure your account for safety',
    },
    {
      icon: 'log-out',
      label: 'Log out',
      subLabel: 'Further secure your account for safety',
    },
  ];

  const moreOptions = [
    {
      icon: 'help-circle',
      label: 'Help & Support',
    },
    {
      icon: 'info',
      label: 'About App',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image source={{ uri: 'https://ui-avatars.com/api/?name=Itunoluwa+Abidoye' }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Itunoluwa Abidoye</Text>
          <Text style={styles.username}>@itunoluwa</Text>
        </View>
        <Pressable
          style={styles.editIconContainer}
          onPress={() =>
            router.push({
              pathname: '/(forms)/employee_engagement_form',
              params: {
                name: 'Rishikesh',
                age: '25',
                height: '170',
                weight: '65',
                mobile: '9876543210',
              },
            })
          }
        >
          <Feather name='edit-3' size={20} color='white' style={styles.editIcon} />
        </Pressable>
      </View>

      {/* Profile Options */}
      <View style={styles.section}>
        {profileOptions.map((item, index) => (
          <Pressable key={index} style={styles.optionRow}>
            <View style={styles.leftIcon}>
              <Feather name={item.icon as any} size={20} color='#6e6e6e' />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.label}>{item.label}</Text>
              {item.subLabel && <Text style={styles.subLabel}>{item.subLabel}</Text>}
            </View>
            <View style={styles.rightElement}>
              {item.toggle ? (
                <Switch
                  value={isFaceIDEnabled}
                  onValueChange={setIsFaceIDEnabled}
                  thumbColor={isFaceIDEnabled ? '#673ab7' : '#ccc'}
                />
              ) : item.alert ? (
                <MaterialIcons name='error-outline' size={20} color='red' />
              ) : (
                <Feather name='chevron-right' size={20} color='#999' />
              )}
            </View>
          </Pressable>
        ))}
      </View>

      {/* More */}
      <Text style={styles.sectionTitle}>More</Text>
      <View style={styles.section}>
        {moreOptions.map((item, index) => (
          <Pressable key={index} style={styles.optionRow}>
            <View style={styles.leftIcon}>
              <Feather name={item.icon as any} size={20} color='#6e6e6e' />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <Feather name='chevron-right' size={20} color='#999' />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
  profileCard: {
    backgroundColor: '#673ab7',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    color: 'white',
    fontSize: 13,
  },
  editIcon: {
    backgroundColor: '#673ab7',
    padding: 8,
    borderRadius: 8,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  leftIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  subLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  rightElement: {
    marginLeft: 10,
  },
  editIconContainer: {
    padding: 10,
    backgroundColor: '#673ab7',
    borderRadius: 20,
  },
});
