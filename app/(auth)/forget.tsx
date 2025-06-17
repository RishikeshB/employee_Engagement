import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { userService } from '../service/user.service';

// Validation schema
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
  newPassword: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function ForgetPasswordScreen() {
  const handleResetPassword = async (values: { phoneNumber: string; newPassword: string }) => {
    try {
      const response = await userService.resetPassword(values);

      if (!response) {
        return Alert.alert('Error', response.message || 'Failed to reset password');
      }
      Alert.alert('Success', 'Password updated successfully');
      router.push('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
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
              <Text style={styles.heading}>Reset Password</Text>
              <Text style={styles.subheading}>Enter your phone number and new password</Text>

              <Formik
                initialValues={{ phoneNumber: '', newPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleResetPassword}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    {/* Phone Number */}
                    <View style={styles.inputBox}>
                      <MaterialCommunityIcons name='phone-outline' size={20} color='#aaa' style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder='Enter Mobile Number'
                        placeholderTextColor='#aaa'
                        keyboardType='phone-pad'
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                      />
                    </View>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                    )}

                    {/* New Password */}
                    <View style={styles.inputBox}>
                      <MaterialCommunityIcons name='lock-outline' size={20} color='#aaa' style={styles.icon} />
                      <TextInput
                        style={styles.input}
                        placeholder='Enter New Password'
                        placeholderTextColor='#aaa'
                        secureTextEntry
                        value={values.newPassword}
                        onChangeText={handleChange('newPassword')}
                        onBlur={handleBlur('newPassword')}
                      />
                    </View>
                    {touched.newPassword && errors.newPassword && (
                      <Text style={styles.errorText}>{errors.newPassword}</Text>
                    )}

                    {/* Reset Button */}
                    <TouchableOpacity style={styles.primaryButton} onPress={() => handleSubmit()}>
                      <Text style={styles.primaryButtonText}>Reset Password</Text>
                    </TouchableOpacity>

                    {/* Back */}
                    <TouchableOpacity onPress={() => router.push('/')}>
                      <Text style={styles.linkText}>← Back to Login</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#777',
    marginBottom: 32,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
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
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 12,
    marginLeft: 4,
  },
  primaryButton: {
    backgroundColor: '#1a5cf0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 13,
    color: '#1a5cf0',
    textAlign: 'center',
  },
});
