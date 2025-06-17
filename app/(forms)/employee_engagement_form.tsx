import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import * as Yup from 'yup';

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
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const params = useLocalSearchParams<{
    name?: string;
    age?: string;
    height?: string;
    weight?: string;
    mobile?: string;
  }>();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      title: 'Edit Profile',
      headerBackTitleVisible: false,
      headerBackTitle: '',
    });
  }, [navigation]);

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

  const calculateHealthMetrics = ({
    name,
    weight,
    height,
    mobile,
  }: {
    name: string;
    weight: string;
    height: string;
    mobile: string;
  }): void => {
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

  const styles = getStyles(isDark);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
        <Formik
          initialValues={{
            name: params.name || '',
            age: params.age || '',
            weight: params.weight || '',
            height: params.height || '',
            mobile: params.mobile || '',
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            calculateHealthMetrics(values);
            actions.setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
            <View style={styles.formWrapper}>
              <TextInput
                style={styles.input}
                placeholder="What's your name?"
                placeholderTextColor={isDark ? '#ccc' : '#888'}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Your age'
                placeholderTextColor={isDark ? '#ccc' : '#888'}
                value={values.age}
                onChangeText={handleChange('age')}
                keyboardType='numeric'
                onBlur={handleBlur('age')}
              />
              {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Phone number'
                placeholderTextColor={isDark ? '#ccc' : '#888'}
                value={values.mobile}
                onChangeText={handleChange('mobile')}
                keyboardType='phone-pad'
                onBlur={handleBlur('mobile')}
              />
              {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Your weight (kg)'
                placeholderTextColor={isDark ? '#ccc' : '#888'}
                value={values.weight}
                onChangeText={handleChange('weight')}
                keyboardType='numeric'
                onBlur={handleBlur('weight')}
              />
              {touched.weight && errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Your height (cm)'
                placeholderTextColor={isDark ? '#ccc' : '#888'}
                value={values.height}
                onChangeText={handleChange('height')}
                keyboardType='numeric'
                onBlur={handleBlur('height')}
              />
              {touched.height && errors.height && <Text style={styles.error}>{errors.height}</Text>}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: dirty && isValid ? '#4FC3F7' : '#aaa' }]}
                onPress={handleSubmit as () => void}
                disabled={!dirty || !isValid}
              >
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

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
    },
    formWrapper: {
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
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
      color: isDark ? '#fff' : '#000',
    },
    error: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
    button: {
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
  });
}
