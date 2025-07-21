import React, { useState } from 'react';
import { ScrollView, ImageBackground, Platform } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { styles } from './style';
import { useLoader } from '../../context/LoaderContext';
import { CheckBoxButton } from '@/src/components/common/CheckBoxButton';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { TitleAndSubtitle } from '@/src/components/common/TitleAndSubtitle';
import { YStack, XStack, getToken, View } from 'tamagui';
import { LabelledTextField } from '@/src/components/common/LabelledTextField';
import PersonIcon from '@/assets/images/icon_person.svg';
import EmailIcon from '@/assets/images/icon_email.svg';
import PhoneIcon from '@/assets/images/icon_phone.svg';
import { LabelledButton } from '@/src/components/common/LabelledButton';
import { Text } from '@/src/components/common/Text';
import { CheckBoxButtonGroup } from '@/src/components/common/CheckBoxButtonGroup';
import { Gender, genders, getGenderIcon } from '@/src/resources/gender';
import { CheckBoxOption, Option } from '@/src/resources/form';
import { SocialMediaButtons } from '@/src/components/common/SocialMediaButtons';
import { LabelledDivider } from '@/src/components/common/LabelledDivider';
import { useRegister } from '@/src/hooks/userRegister';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be 10 digits')
    .required('Phone is required'),
  dob: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'DOB must be in DD/MM/YYYY')
    .required('DOB is required'),
  gender: Yup.string()
    .oneOf(Object.keys(genders))
    .required('Gender is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

// Mock API function - replace with your actual API
const signUpApi = async (data: any) => {
  console.log('SignUp API called with:', data);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, 1000);
  });
};

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2000, 0, 1));
  const [selectedGender, setSelectedGender] = useState<
    Option<string> | undefined
  >(undefined);
  const { register, loading, error, response } = useRegister();

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    terms: false,
    password: 'P@ss1234',
  };

  const genderOptions: CheckBoxOption<string>[] = Object.keys(genders).reduce(
    (list: CheckBoxOption<string>[], value) => [
      ...list,
      {
        label: genders[value as keyof typeof genders],
        value,
        icon: (
          <MaterialIcons
            name={getGenderIcon(value as Gender)}
            size={40}
            color={
              selectedGender == undefined
                ? getToken('$color.white')
                : selectedGender?.value == value
                ? getToken('$color.button_bg_red')
                : getToken('$color.gray')
            }
            style={{ marginLeft: 8 }}
          />
        ),
      },
    ],
    [],
  );

  const { showLoader, hideLoader } = useLoader();

  const handleSignUp = async (values: any) => {
    try {
      showLoader();
      await register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dob,
        gender: values.gender,
        password: values.password,
      });
      console.log('Signup success:', response);
      navigation.navigate('Otp', {
        data: '',
        page: 'signup',
      });
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      hideLoader();
    }
  };

  const handleDateChange = (
    event: any,
    date: Date | undefined,
    setFieldValue: any,
  ) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const formatted = `${String(date.getDate()).padStart(2, '0')}/${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}/${date.getFullYear()}`;
      setFieldValue('dob', formatted);
    }
  };

  const handleGenderChange = (option: Option<string>, setFieldValue: any) => {
    setFieldValue('gender', option.value);
    setSelectedGender(option);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/splashScreen.png')}
      style={styles.imgContainer}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <YStack
          theme="dark"
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
          marginTop={'$20'}
          marginBottom={'$6'}
        >
          <TitleAndSubtitle marginBottom="$8" />

          <XStack
            theme="sign_up_headline_2"
            gap={'$1'}
            justifyContent="center"
            paddingHorizontal={'$10'}
          >
            <Text textAlign="center">
              <Text
                font="heading"
                size="extra_large"
                color={'$background'}
              >{`Hello!`}</Text>
              <Text
                font="heading"
                size="extra_large"
              >{` Register To Get Started`}</Text>
            </Text>
          </XStack>

          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <YStack marginTop={'$12'} gap={'$6'} width="100%">
                {/* Full Name */}
                <YStack gap={'$2'}>
                  <LabelledTextField
                    label="Full Name"
                    placeholder="Enter Your Full Name"
                    icon={<PersonIcon />}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                  />
                  {touched.fullName && errors.fullName && (
                    <Text theme={'error_message'}>{errors.fullName}</Text>
                  )}
                </YStack>

                {/* Email */}
                <YStack gap={'$2'}>
                  <LabelledTextField
                    label="Email ID"
                    placeholder="Enter Your Email"
                    icon={<EmailIcon />}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text theme={'error_message'}>{errors.email}</Text>
                  )}
                </YStack>

                {/* Phone */}
                <YStack gap={'$2'}>
                  <LabelledTextField
                    label="Phone No."
                    placeholder="Enter Your Phone No."
                    icon={<PhoneIcon />}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType="number-pad"
                  />
                  {touched.phone && errors.phone && (
                    <Text theme={'error_message'}>{errors.phone}</Text>
                  )}
                </YStack>

                {/* DOB Date Picker */}
                <YStack gap={'$2'}>
                  <LabelledButton
                    label="Date Of Birth"
                    icon={<Entypo name="cake" color="#000000" size={20} />}
                    onPress={() => setShowDatePicker(true)}
                    title={values.dob || 'DD / MM / YYYY'}
                  />
                  {touched.dob && errors.dob && (
                    <Text theme={'error_message'}>{errors.dob}</Text>
                  )}

                  {showDatePicker && (
                    <View
                      theme="date_picker"
                      backgroundColor={'$background'}
                      alignItems="center"
                      padding={'$4'}
                      borderRadius={'$10'}
                      marginTop={'$2'}
                    >
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        maximumDate={new Date()}
                        onChange={(event, date) =>
                          handleDateChange(event, date, setFieldValue)
                        }
                        style={{ backgroundColor: getToken('$color.white') }}
                      />
                    </View>
                  )}
                </YStack>
                {/* Gender */}
                <YStack gap={'$2'}>
                  <YStack>
                    <Text size="normal" font="heading" color="$color">
                      Select Gender
                    </Text>
                    <CheckBoxButtonGroup
                      options={genderOptions}
                      selectedOption={selectedGender}
                      onChange={option =>
                        handleGenderChange(option, setFieldValue)
                      }
                    />
                  </YStack>
                  {touched.gender && errors.gender && (
                    <Text theme={'error_message'}>{errors.gender}</Text>
                  )}
                </YStack>
                {/* Terms */}
                <YStack gap={'$2'}>
                  <CheckBoxButton
                    option={{
                      label:
                        'I Accept all Terms and Conditions and Privacy Policy',
                      value: '',
                    }}
                    selected={values.terms}
                    onChange={() => setFieldValue('terms', !values.terms)}
                  />
                  {touched.terms && errors.terms && (
                    <Text theme={'error_message'}>{errors.terms}</Text>
                  )}
                </YStack>
                {/* Submit */}
                <PrimaryButton
                  title="Continue"
                  onPress={() => handleSubmit()}
                  marginTop="$2"
                  //   disabled={!isChecked || input === ''}
                />
                <LabelledDivider
                  label={`Or Sign Up With`}
                  width={'20%'}
                  marginTop="$2"
                />

                <SocialMediaButtons onGoogle={() => {}} onFacebook={() => {}} />
                <XStack
                  theme={'sign_up_button'}
                  justifyContent="center"
                  alignItems="center"
                  gap="$2"
                >
                  <Text size="small" font="heading" color="$color">
                    {`Already Have An Account?`}
                  </Text>
                  <Text
                    size="normal"
                    font="heading"
                    color="$background"
                    onPress={() => navigation.navigate('Login')}
                  >
                    {`Sign In`}
                  </Text>
                </XStack>
              </YStack>
            )}
          </Formik>
        </YStack>
      </ScrollView>
    </ImageBackground>
  );
}
