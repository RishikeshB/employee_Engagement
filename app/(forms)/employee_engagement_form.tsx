import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Yup from 'yup';

enum triggerType {
  hours,
  mins,
  sec,
}
interface FormValues {
  name: string;
  age: string;
  weight: string;
  height: string;
  mobile: string;
  remainder: number;
  triggerType: number;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').min(18, 'Minimum age is 18'),
  weight: Yup.number().required('Weight is required').positive('Must be positive'),
  height: Yup.number().required('Height is required').positive('Must be positive'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  remainder: Yup.number().required('Remainder is required').positive('Must be positive'),
  triggerType: Yup.string().required('Trigger Type is required'),
});

const EmployeeEngagementForm: React.FC = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  // ✅ Extract params safely
  const params = useLocalSearchParams<any>();
  useEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [params.name]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const calculateHealthMetrics = ({ name, weight, height, mobile }: FormValues): void => {
    const weightKg = parseFloat(weight);
    const heightMeters = parseFloat(height) / 100;
    const bmi = weightKg / (heightMeters * heightMeters);
    const waterIntake = weightKg * 0.033;
    Alert.alert(
      'Employee Health Info',
      `Hello ${name} (${mobile}),\n\nYour BMI: ${bmi.toFixed(2)}\nRecommended Water Intake: ${waterIntake.toFixed(
        2
      )} L/day`
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: profileImage ?? 'https://i.imgur.com/0y8Ftya.png', // fallback avatar
            }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Employee Name</Text>
          <Text style={styles.profileEmail}>employee@example.com</Text>
        </View>

        {/* Form Section */}
        <Formik
          initialValues={{
            name: '',
            age: '',
            weight: '',
            height: '',
            mobile: '',
            remainder: 5,
            triggerType: triggerType.mins,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            calculateHealthMetrics(values as any);
            actions.setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <View style={styles.formWrapper}>
              <TextInput
                style={styles.input}
                placeholder="What's your name?"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Your age'
                value={values.age}
                onChangeText={handleChange('age')}
                keyboardType='numeric'
                onBlur={handleBlur('age')}
              />
              {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}
              <TextInput
                style={styles.input}
                placeholder='Phone number'
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                keyboardType='phone-pad'
                onBlur={handleBlur('mobile')}
              />
              {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
              <TextInput
                style={styles.input}
                placeholder='Your weight (kg)'
                value={values.weight}
                onChangeText={handleChange('weight')}
                keyboardType='numeric'
                onBlur={handleBlur('weight')}
              />
              {touched.weight && errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Your height (cm)'
                value={values.height}
                onChangeText={handleChange('height')}
                keyboardType='numeric'
                onBlur={handleBlur('height')}
              />
              {touched.height && errors.height && <Text style={styles.error}>{errors.height}</Text>}

              <View style={styles.stepperSection}>
                <Text style={styles.label}>Reminder Interval</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((value) => (
                    <TouchableOpacity
                      key={value}
                      style={[styles.stepButton, values.remainder === value && styles.stepButtonSelected]}
                      onPress={() => handleChange('remainder')(String(value))}
                    >
                      <Text
                        style={[styles.stepButtonText, values.remainder === value && styles.stepButtonTextSelected]}
                      >
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {touched.remainder && errors.remainder && <Text style={styles.error}>{errors.remainder}</Text>}
              </View>

              <View style={styles.triggerTypeWrapper}>
                <Text style={styles.label}>Trigger Type</Text>
                <View style={styles.triggerTypeContainer}>
                  {Object.entries(triggerType)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, val]) => (
                      <TouchableOpacity
                        key={key}
                        style={[styles.triggerButton, values.triggerType === val && styles.triggerButtonSelected]}
                        onPress={() => setFieldValue('triggerType', val)}
                      >
                        <Text
                          style={[
                            styles.triggerButtonText,
                            values.triggerType === val && styles.triggerButtonTextSelected,
                          ]}
                        >
                          {key}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
                {touched.triggerType && errors.triggerType && <Text style={styles.error}>{errors.triggerType}</Text>}
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit as () => void}>
                <Text style={styles.buttonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EmployeeEngagementForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
  },
  formWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#673ab7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepperSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  stepButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  stepButtonSelected: {
    backgroundColor: '#673ab7',
  },
  stepButtonText: {
    fontSize: 14,
    color: '#333',
  },
  stepButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },

  triggerTypeWrapper: {
    marginBottom: 20,
  },
  triggerTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  triggerButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  triggerButtonSelected: {
    backgroundColor: '#673ab7',
  },
  triggerButtonText: {
    fontSize: 14,
    color: '#333',
  },
  triggerButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
