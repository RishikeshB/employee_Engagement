import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { userService } from './service/user.service';

const LoginScreen = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
      .required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values: { phoneNumber: string; password: string }) => {
    setLoading(true);
    try {
      console.log('hello', values);
      const response = await userService.getUser(values.phoneNumber, values.password);
      if (response) {
        await AsyncStorage.setItem('user', JSON.stringify(response));
        console.log(response);
        setTimeout(() => {
          router.replace('/(tabs)/home');
        }, 500);
      } else {
        Alert.alert('Error', 'Invalid phone number or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.innerContainer}>
              <Text style={styles.heading}>Welcome Back</Text>
              <Text style={styles.subheading}>Login to your account</Text>

              <Formik
                initialValues={{ phoneNumber: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    {/* Phone Number */}
                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.inputBox}>
                      <Feather name='user' size={20} color='#aaa' style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder='Enter Phone Number'
                        placeholderTextColor='#aaa'
                        keyboardType='phone-pad'
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                      />
                    </View>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text style={styles.error}>{errors.phoneNumber}</Text>
                    )}

                    {/* Password */}
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputBox}>
                      <Feather name='lock' size={20} color='#aaa' style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder='Enter Password'
                        placeholderTextColor='#aaa'
                        secureTextEntry={secureEntry}
                        autoCapitalize='none'
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                        <Feather name={secureEntry ? 'eye-off' : 'eye'} size={20} color='#aaa' />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    {/* Login Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleSubmit as any} disabled={loading}>
                      {loading ? <ActivityIndicator color='#fff' /> : <Text style={styles.loginText}>Login</Text>}
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPassword} onPress={() => router.push('/forget')}>
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <View style={styles.footer}>
                      <Text style={styles.footerText}>Don't have an account?</Text>
                      <TouchableOpacity onPress={() => router.push('/signup')}>
                        <Text style={styles.signupLink}> Sign Up</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 70,
  },
  innerContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#1a5cf0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#1a5cf0',
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 13,
  },
  signupLink: {
    color: '#1a5cf0',
    fontSize: 13,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
});
