import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <Text style={styles.title}>Welcome to WellZone</Text>
        <Image
          source={{ uri: 'https://source.unsplash.com/featured/?wellness,meditation,fitness' }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>Your Wellness, Our Priority</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/(forms)/employee_engagement_form')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => alert('Login Pressed')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#0072ff',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#0072ff',
    fontWeight: '600',
    fontSize: 16,
  },
});
