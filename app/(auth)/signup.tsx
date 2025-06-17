import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { userService } from '../service/user.service';

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  age: string;
  weight: string;
  height: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
    .required('Phone number is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  age: Yup.number().min(1).max(120).required('Age is required'),
  weight: Yup.number().min(1).max(500).required('Weight is required'),
  height: Yup.number().min(30).max(300).required('Height is required'),
});

const SignupScreen = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const ageRef = useRef<TextInput>(null);
  const weightRef = useRef<TextInput>(null);
  const heightRef = useRef<TextInput>(null);

  const inputRefs: Record<keyof FormValues, React.RefObject<TextInput | null>> = {
    name: emailRef,
    email: phoneRef,
    phoneNumber: passwordRef,
    password: ageRef,
    age: weightRef,
    weight: heightRef,
    height: { current: null },
  };

  const fields: {
    label: string;
    key: keyof FormValues;
    icon: keyof typeof Feather.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
    ref: React.RefObject<TextInput | null>;
    keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
    isPassword?: boolean;
  }[] = [
    { label: 'Name', key: 'name', icon: 'user', ref: emailRef },
    { label: 'Email', key: 'email', icon: 'email-outline', ref: phoneRef, keyboardType: 'email-address' },
    { label: 'Phone Number', key: 'phoneNumber', icon: 'phone', ref: passwordRef, keyboardType: 'phone-pad' },
    { label: 'Password', key: 'password', icon: 'lock', ref: ageRef, isPassword: true },
    { label: 'Age', key: 'age', icon: 'calendar', ref: weightRef, keyboardType: 'numeric' },
    { label: 'Weight (kg)', key: 'weight', icon: 'weight', ref: heightRef, keyboardType: 'numeric' },
    { label: 'Height (cm)', key: 'height', icon: 'ruler', ref: { current: null }, keyboardType: 'numeric' },
  ];

  const createUser = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await userService.createUser(values);
      if (response) {
        Alert.alert('Success', 'User created successfully');
        router.replace('/');
      } else {
        Alert.alert('Error', 'Could not create user');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Stack.Screen options={{ headerShown: false }} />
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.subheading}>Sign up to get started</Text>

          <Formik
            initialValues={{
              name: '',
              email: '',
              phoneNumber: '',
              password: '',
              age: '',
              weight: '',
              height: '',
            }}
            validationSchema={validationSchema}
            onSubmit={createUser}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                {fields.map((field, idx) => (
                  <View key={field.key.toString()}>
                    <Text style={styles.label}>{field.label}</Text>
                    <View style={styles.inputBox}>
                      {field.icon === 'email-outline' || field.icon === 'weight' || field.icon === 'ruler' ? (
                        <MaterialCommunityIcons name={field.icon} size={20} color='#aaa' style={styles.icon} />
                      ) : (
                        <Feather name={field.icon as any} size={20} color='#aaa' style={styles.icon} />
                      )}
                      <TextInput
                        ref={field.ref}
                        style={styles.input}
                        placeholder={`Enter ${field.label}`}
                        placeholderTextColor='#aaa'
                        secureTextEntry={field.isPassword ? secureEntry : false}
                        keyboardType={field.keyboardType || 'default'}
                        autoCapitalize='none'
                        value={values[field.key]}
                        onChangeText={handleChange(field.key)}
                        onBlur={handleBlur(field.key)}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                          const nextField = fields[idx + 1];
                          if (nextField?.ref?.current) {
                            nextField.ref.current.focus();
                          } else {
                            Keyboard.dismiss();
                          }
                        }}
                      />
                      {field.isPassword && (
                        <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                          <Feather name={secureEntry ? 'eye-off' : 'eye'} size={20} color='#aaa' />
                        </TouchableOpacity>
                      )}
                    </View>
                    {touched[field.key] && errors[field.key] && <Text style={styles.error}>{errors[field.key]}</Text>}
                  </View>
                ))}

                <TouchableOpacity style={styles.createButton} onPress={handleSubmit as any} disabled={loading}>
                  {loading ? <ActivityIndicator color='#fff' /> : <Text style={styles.createText}>Create Account</Text>}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingTop: 40,
    padding: 30,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#111',
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 30,
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
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
  },
  createButton: {
    backgroundColor: '#1a5cf0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  createText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 13,
  },
  loginLink: {
    color: '#1a5cf0',
    fontSize: 13,
  },
});
