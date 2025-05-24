import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  age: string;
  weight: string;
  height: string;
  mobile: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').min(18, 'Minimum age is 18'),
  weight: Yup.number().required('Weight is required').positive('Must be positive'),
  height: Yup.number().required('Height is required').positive('Must be positive'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
});

const EmployeeEngagementForm: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
    console.log(`BMI: ${bmi}, Water Intake: ${waterIntake} L/day`);
    Alert.alert(
      'Employee Health Info',
      `Hello ${name} (${mobile}),\n\nYour BMI: ${bmi.toFixed(2)}\nRecommended Water Intake: ${waterIntake.toFixed(
        2
      )} L/day`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Employee Engagement - Health Form</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <View style={styles.iconCircle}>
            <Ionicons name='camera' size={40} color='#555' />
            <Text style={styles.iconText}>Upload</Text>
          </View>
        )}
      </TouchableOpacity>
      <Formik
        initialValues={{ name: '', age: '', weight: '', height: '', mobile: '' }}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
          calculateHealthMetrics(values);
          actions.setSubmitting(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Name'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder='Mobile Number'
              keyboardType='phone-pad'
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
            />
            {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

            <TextInput
              style={styles.input}
              placeholder='Age'
              keyboardType='numeric'
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
            />
            {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}

            <TextInput
              style={styles.input}
              placeholder='Weight (kg)'
              keyboardType='numeric'
              onChangeText={handleChange('weight')}
              onBlur={handleBlur('weight')}
              value={values.weight}
            />
            {touched.weight && errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

            <TextInput
              style={styles.input}
              placeholder='Height (cm)'
              keyboardType='numeric'
              onChangeText={handleChange('height')}
              onBlur={handleBlur('height')}
              value={values.height}
            />
            {touched.height && errors.height && <Text style={styles.error}>{errors.height}</Text>}

            <Button title='Submit' onPress={handleSubmit as () => void} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default EmployeeEngagementForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  pickImageText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  iconText: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
});
