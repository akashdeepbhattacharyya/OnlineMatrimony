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
import { YStack, XStack, getToken } from 'tamagui';
import { LabelledTextField } from '@/src/components/common/LabelledTextField';
import PersonIcon from '@/assets/images/icon_person.svg';
import EmailIcon from '@/assets/images/icon_email.svg';
import PhoneIcon from '@/assets/images/icon_phone.svg';
import { LabelledButton } from '@/src/components/common/LabelledButton';
import { Text } from '@/src/components/common/Text';
import { CheckBoxButtonGroup } from '@/src/components/common/CheckBoxButtonGroup';
import { Gender, genders, getGenderIcon } from '@/resources/gender';
import { CheckBoxOption, Option } from '@/resources/form';
import { SocialMediaButtons } from '@/src/components/common/SocialMediaButtons';
import { LabelledDivider } from '@/src/components/common/LabelledDivider';

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

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    terms: false,
    password: 'P@ss1234',
  };

  const sdfd = Object.keys(genders);

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
      const response = await signUpApi({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        gender: values.gender,
        password: values.password,
      });

      console.log('Signup success:', response);
      navigation.navigate('Otp', {
        data: response.data,
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
          marginTop: 250,
        }}
      >
        <YStack
          theme="dark"
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
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
                <LabelledTextField
                  label="Full Name"
                  placeholder="Enter Your Full Name"
                  icon={<PersonIcon />}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={{ color: 'red' }}>{errors.fullName}</Text>
                )}
                {/* <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Enter Your Full Name"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                />
              </View> */}

                {/* Email */}
                <LabelledTextField
                  label="Email ID"
                  placeholder="Enter Your Email"
                  icon={<EmailIcon />}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={{ color: 'red' }}>{errors.email}</Text>
                )}
                {/* <Text style={styles.label}>Email Id</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="mail-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Enter Your Email"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                </View> */}

                {/* Phone */}
                <LabelledTextField
                  label="Phone No."
                  placeholder="Enter Your Phone No."
                  icon={<PhoneIcon />}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType="number-pad"
                />
                {/* <Text style={styles.label}>Phone No</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="call"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Enter Your Phone"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    keyboardType="number-pad"
                    onBlur={handleBlur('phone')}
                  />
                </View> */}
                {touched.phone && errors.phone && (
                  <Text style={{ color: 'red' }}>{errors.phone}</Text>
                )}

                {/* DOB Date Picker */}
                <LabelledButton
                  label="Date Of Birth"
                  icon={<Entypo name="cake" color="#000000" size={20} />}
                  onPress={() => setShowDatePicker(true)}
                  title={values.dob || 'DD / MM / YYYY'}
                />
                {/* <Text style={styles.label}>Date Of Birth</Text>
                <TouchableOpacity
                  style={styles.inputWrapper}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Entypo
                    name="cake"
                    color="#888"
                    size={20}
                    style={styles.inputIcon}
                  />
                  <Text style={[styles.input, { paddingTop: 10 }]}>
                    {values.dob || 'Select Date of Birth'}
                  </Text>
                </TouchableOpacity> */}
                {touched.dob && errors.dob && (
                  <Text style={{ color: 'red' }}>{errors.dob}</Text>
                )}

                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={new Date()}
                    onChange={(event, date) =>
                      handleDateChange(event, date, setFieldValue)
                    }
                  />
                )}

                {/* Gender */}
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
                {/* <View style={styles.checkboxWrapper}>
                  {genderOptions.map(option => {
                    const isSelected = values.gender === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.checkboxContainer}
                        onPress={() => setFieldValue('gender', option.value)}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            isSelected && styles.checked,
                          ]}
                        >
                          {isSelected && (
                            <MaterialIcons
                              name="check"
                              size={16}
                              color="#fff"
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.checkboxText,
                            isSelected && { color: option.color },
                          ]}
                        >
                          {option.label}
                        </Text>
                        <MaterialIcons
                          name={option.icon as any}
                          size={24}
                          color={isSelected ? option.color : '#aaa'}
                          style={{ marginLeft: 8 }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View> */}
                {touched.gender && errors.gender && (
                  <Text style={{ color: 'red' }}>{errors.gender}</Text>
                )}

                {/* Terms */}
                <CheckBoxButton
                  option={{
                    label:
                      'I Accept all Terms and Conditions and Privacy Policy',
                    value: '',
                  }}
                  selected={values.terms}
                  onChange={() => setFieldValue('terms', !values.terms)}
                />
                {/* <View style={styles.checkboxWrapper}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setFieldValue('terms', !values.terms)}
                  >
                    <View style={styles.checkbox}>
                      {values.terms && (
                        <MaterialIcons name="check" size={18} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>
                      Terms & Condition & Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </View> */}
                {touched.terms && errors.terms && (
                  <Text style={{ color: 'red' }}>{errors.terms}</Text>
                )}

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
                {/* <TouchableOpacity
                  style={styles.otpButton}
                  onPress={() => handleSubmit()}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    <Text style={styles.otpButtonText}>Continue</Text>
                    <Svg
                      width="19"
                      height="15"
                      viewBox="0 0 13 12"
                      fill="white"
                    >
                      <Path
                        d="M12.8527 6.36954L7.84048 11.3573C7.74636 11.451 7.6189 11.5034 7.48612 11.5031C7.35335 11.5027 7.22614 11.4497 7.13248 11.3556C7.03882 11.2614 6.98639 11.134 6.98672 11.0012C6.98704 10.8684 7.0401 10.7412 7.13421 10.6476L11.2913 6.51172L0.498377 6.48532C0.365769 6.48499 0.238721 6.432 0.145183 6.33801C0.0516446 6.24401 -0.00072213 6.1167 -0.000397666 5.98409C-7.32025e-05 5.85149 0.0529159 5.72444 0.146913 5.6309C0.24091 5.53736 0.368216 5.48499 0.500824 5.48532L11.2938 5.51173L7.15695 1.35559C7.06329 1.26148 7.01086 1.13401 7.01118 1.00124C7.01151 0.86846 7.06456 0.741252 7.15868 0.647595C7.2528 0.553938 7.38026 0.501505 7.51304 0.50183C7.64581 0.502155 7.77302 0.555211 7.86668 0.649327L12.8544 5.66155C12.9009 5.70811 12.9377 5.76337 12.9627 5.82418C12.9878 5.88499 13.0006 5.95014 13.0005 6.0159C13.0003 6.08167 12.9872 6.14676 12.9618 6.20744C12.9365 6.26813 12.8994 6.32321 12.8527 6.36954Z"
                        fill="white"
                      />
                    </Svg>
                  </View>
                </TouchableOpacity> */}
              </YStack>
            )}
          </Formik>
        </YStack>
      </ScrollView>
    </ImageBackground>
    // <View style={{ flex: 1, backgroundColor: 'white' }}>
    //     <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    //     <ImageBackground
    //         source={require('../../../assets/images/splashScreen.png')}
    //         style={styles.imgContainer}
    //         resizeMode="cover"
    //     >
    //         <ScrollView contentContainerStyle={styles.scrollContainer}>
    //             <LinearGradient
    //                 colors={['rgba(66, 66, 66, 0.1)', 'rgb(6, 6, 6)']}
    //                 start={{ x: 0, y: 0 }}
    //                 end={{ x: 0, y: 1 }}
    //                 style={styles.content}
    //             >
    //                 <View style={{ paddingHorizontal: 20, width: '100%' }}>
    //                     <Text style={styles.logo}>LOGO</Text>
    //                     <Text style={styles.tagline}>BRINGING HEARTS TOGETHER</Text>
    //                     <Text style={styles.greeting}>
    //                         <Text style={styles.hello}>Hello!</Text> Register To Get Started
    //                     </Text>

    //                     <Formik
    //                         initialValues={initialValues}
    //                         validationSchema={SignupSchema}
    //                         onSubmit={handleSignUp}
    //                     >
    //                         {({
    //                             handleChange,
    //                             handleBlur,
    //                             handleSubmit,
    //                             setFieldValue,
    //                             values,
    //                             touched,
    //                             errors,
    //                         }) => (
    //                             <>
    //                                 {/* Full Name */}
    //                                 <Text style={styles.label}>Full Name</Text>
    //                                 <View style={styles.inputWrapper}>
    //                                     <MaterialIcons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
    //                                     <TextInput
    //                                         placeholder="Enter Your Full Name"
    //                                         placeholderTextColor="#aaa"
    //                                         style={styles.input}
    //                                         value={values.fullName}
    //                                         onChangeText={handleChange('fullName')}
    //                                         onBlur={handleBlur('fullName')}
    //                                     />
    //                                 </View>
    //                                 {touched.fullName && errors.fullName && (
    //                                     <Text style={{ color: 'red' }}>{errors.fullName}</Text>
    //                                 )}

    //                                 {/* Email */}
    //                                 <Text style={styles.label}>Email Id</Text>
    //                                 <View style={styles.inputWrapper}>
    //                                     <MaterialIcons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
    //                                     <TextInput
    //                                         placeholder="Enter Your Email"
    //                                         placeholderTextColor="#aaa"
    //                                         style={styles.input}
    //                                         value={values.email}
    //                                         onChangeText={handleChange('email')}
    //                                         onBlur={handleBlur('email')}
    //                                     />
    //                                 </View>
    //                                 {touched.email && errors.email && (
    //                                     <Text style={{ color: 'red' }}>{errors.email}</Text>
    //                                 )}

    //                                 {/* Phone */}
    //                                 <Text style={styles.label}>Phone No</Text>
    //                                 <View style={styles.inputWrapper}>
    //                                     <MaterialIcons name="call" size={20} color="#888" style={styles.inputIcon} />
    //                                     <TextInput
    //                                         placeholder="Enter Your Phone"
    //                                         placeholderTextColor="#aaa"
    //                                         style={styles.input}
    //                                         value={values.phone}
    //                                         onChangeText={handleChange('phone')}
    //                                         keyboardType="number-pad"
    //                                         onBlur={handleBlur('phone')}
    //                                     />
    //                                 </View>
    //                                 {touched.phone && errors.phone && (
    //                                     <Text style={{ color: 'red' }}>{errors.phone}</Text>
    //                                 )}

    //                                 {/* DOB Date Picker */}
    //                                 <Text style={styles.label}>Date Of Birth</Text>
    //                                 <TouchableOpacity
    //                                     style={styles.inputWrapper}
    //                                     onPress={() => setShowDatePicker(true)}
    //                                 >
    //                                     <Entypo name="cake" color="#888" size={20} style={styles.inputIcon} />
    //                                     <Text style={[styles.input, { paddingTop: 10 }]}>
    //                                         {values.dob || 'Select Date of Birth'}
    //                                     </Text>
    //                                 </TouchableOpacity>
    //                                 {touched.dob && errors.dob && <Text style={{ color: 'red' }}>{errors.dob}</Text>}

    //                                 {showDatePicker && (
    //                                     <DateTimePicker
    //                                         value={selectedDate}
    //                                         mode="date"
    //                                         display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    //                                         maximumDate={new Date()}
    //                                         onChange={(event, date) => handleDateChange(event, date, setFieldValue)}
    //                                     />
    //                                 )}

    //                                 {/* Gender */}
    //                                 <View style={styles.checkboxWrapper}>
    //                                     {genderOptions.map((option) => {
    //                                         const isSelected = values.gender === option.value;
    //                                         return (
    //                                             <TouchableOpacity
    //                                                 key={option.value}
    //                                                 style={styles.checkboxContainer}
    //                                                 onPress={() => setFieldValue('gender', option.value)}
    //                                             >
    //                                                 <View style={[styles.checkbox, isSelected && styles.checked]}>
    //                                                     {isSelected && <MaterialIcons name="check" size={16} color="#fff" />}
    //                                                 </View>
    //                                                 <Text style={[styles.checkboxText, isSelected && { color: option.color }]}>
    //                                                     {option.label}
    //                                                 </Text>
    //                                                 <MaterialIcons
    //                                                     name={option.icon as any}
    //                                                     size={24}
    //                                                     color={isSelected ? option.color : '#aaa'}
    //                                                     style={{ marginLeft: 8 }}
    //                                                 />
    //                                             </TouchableOpacity>
    //                                         );
    //                                     })}
    //                                 </View>
    //                                 {touched.gender && errors.gender && (
    //                                     <Text style={{ color: 'red' }}>{errors.gender}</Text>
    //                                 )}

    //                                 {/* Terms */}
    //                                 <View style={styles.checkboxWrapper}>
    //                                     <TouchableOpacity
    //                                         style={styles.checkboxContainer}
    //                                         onPress={() => setFieldValue('terms', !values.terms)}
    //                                     >
    //                                         <View style={styles.checkbox}>
    //                                             {values.terms && <MaterialIcons name="check" size={18} color="#fff" />}
    //                                         </View>
    //                                         <Text style={styles.checkboxText}>Terms & Condition & Privacy Policy</Text>
    //                                     </TouchableOpacity>
    //                                 </View>
    //                                 {touched.terms && errors.terms && (
    //                                     <Text style={{ color: 'red' }}>{errors.terms}</Text>
    //                                 )}

    //                                 {/* Submit */}
    //                                 <TouchableOpacity style={styles.otpButton} onPress={() => handleSubmit()}>
    //                                     <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
    //                                         <Text style={styles.otpButtonText}>Continue</Text>
    //                                         <Svg width="19" height="15" viewBox="0 0 13 12" fill="white">
    //                                             <Path d="M12.8527 6.36954L7.84048 11.3573C7.74636 11.451 7.6189 11.5034 7.48612 11.5031C7.35335 11.5027 7.22614 11.4497 7.13248 11.3556C7.03882 11.2614 6.98639 11.134 6.98672 11.0012C6.98704 10.8684 7.0401 10.7412 7.13421 10.6476L11.2913 6.51172L0.498377 6.48532C0.365769 6.48499 0.238721 6.432 0.145183 6.33801C0.0516446 6.24401 -0.00072213 6.1167 -0.000397666 5.98409C-7.32025e-05 5.85149 0.0529159 5.72444 0.146913 5.6309C0.24091 5.53736 0.368216 5.48499 0.500824 5.48532L11.2938 5.51173L7.15695 1.35559C7.06329 1.26148 7.01086 1.13401 7.01118 1.00124C7.01151 0.86846 7.06456 0.741252 7.15868 0.647595C7.2528 0.553938 7.38026 0.501505 7.51304 0.50183C7.64581 0.502155 7.77302 0.555211 7.86668 0.649327L12.8544 5.66155C12.9009 5.70811 12.9377 5.76337 12.9627 5.82418C12.9878 5.88499 13.0006 5.95014 13.0005 6.0159C13.0003 6.08167 12.9872 6.14676 12.9618 6.20744C12.9365 6.26813 12.8994 6.32321 12.8527 6.36954Z" fill="white" />
    //                                         </Svg>
    //                                     </View>
    //                                 </TouchableOpacity>
    //                             </>
    //                         )}
    //                     </Formik>

    //                     {/* Divider */}
    //                     <View style={styles.textWrapper}>
    //                         <Text style={styles.dashedDivider}>Or Sign Up With</Text>
    //                     </View>

    //                     {/* Social Buttons */}
    //                     <View style={styles.socialIcons}>
    //                         <TouchableOpacity style={styles.socialButton}>
    //                             <GoogleIcon width={85} height={85} />
    //                         </TouchableOpacity>
    //                         <TouchableOpacity style={styles.socialButton}>
    //                             <FacebookIcon width={85} height={85} fill="white" />
    //                         </TouchableOpacity>
    //                     </View>

    //                     {/* Login Redirect */}
    //                     <View style={styles.signupContainer}>
    //                         <Text style={styles.signupText}>Already have an account?</Text>
    //                         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    //                             <Text style={styles.signupLink}> Sign In</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             </LinearGradient>
    //         </ScrollView>
    //     </ImageBackground>
    // </View>
  );
}
