import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Pressable, ScrollView } from 'react-native-gesture-handler';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // ✅ Add user state
  const [user, setUser] = useState<{
    name?: string;
    phoneNumber?: string;
    age?: number;
    height?: number;
    weight?: number;
  }>({});

  // ✅ Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log('Error loading user data', error);
      }
    };

    loadUser();
  }, []);

  const styles = getStyles(isDark);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    router.replace('/');
    console.log('User logged out');
  };

  const handleEdit = async () => {
    if (user) {
      console.log(user);
      router.push({
        pathname: '/(forms)/employee_engagement_form',
        params: {
          name: user.name || '',
          age: user.age?.toString() || '',
          height: user.height?.toString() || '',
          weight: user.weight?.toString() || '',
          mobile: user.phoneNumber || '',
        },
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || 'Guest'
            )}&background=4FC3F7&color=fff`,
          }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.name || 'Your Name'}</Text>
          <Text style={styles.username}>{user?.phoneNumber || 'username'}</Text>
        </View>

        <Pressable style={styles.editIconContainer} onPress={handleEdit}>
          <Feather name='edit' size={20} color='white' />
        </Pressable>

        <Pressable
          style={styles.editIconContainer}
          onPress={() =>
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: handleLogout, style: 'destructive' },
              ],
              { cancelable: true }
            )
          }
        >
          <Feather name='log-out' size={20} color='#6e6e6e' />
        </Pressable>
      </View>
    </ScrollView>
  );
}

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      paddingTop: 70,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: isDark ? '#121212' : '#ffffff',
    },
    profileCard: {
      backgroundColor: '#4FC3F770',
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
    editIconContainer: {
      padding: 10,
      backgroundColor: '#4FC3F7',
      borderRadius: 20,
      marginLeft: 8,
    },
  });
}
