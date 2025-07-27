import { useState } from 'react';
import { ScrollView, ImageBackground, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Formik } from 'formik';
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
import {
  CheckBoxOption,
  Option,
  UserRegistrationFormType,
} from '@/src/resources/form';
import { SocialMediaButtons } from '@/src/components/common/SocialMediaButtons';
import { LabelledDivider } from '@/src/components/common/LabelledDivider';
import { useUserAuth } from '@/src/hooks/useUserAuth';
import { userRegistrationSchema } from '@/src/resources/validations/user-registration';
import { UserRegistrationRequest } from '@/src/models/Authentication';
import { formatDate, formatDateString } from '@/src/utils/dateFormatter';
import DOBIcon from '@/assets/images/icon-dob.svg';

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2000, 0, 1));
  const [selectedGender, setSelectedGender] = useState<
    Option<string> | undefined
  >(__DEV__ ? process.env.SIGNUP_GENDER : undefined);
  const { register, error: userRegistrationError, data } = useUserAuth();

  const initialValues = {
    fullName: __DEV__ ? process.env.SIGNUP_FULL_NAME : '',
    email: __DEV__ ? process.env.SIGNUP_EMAIL : '',
    phone: __DEV__ ? process.env.SIGNUP_PHONE_NO : '',
    dateOfBirth: __DEV__ ? process.env.SIGNUP_DOB : '',
    gender: __DEV__ ? process.env.SIGNUP_GENDER : '',
    terms: __DEV__ ? process.env.SIGNUP_TERMS : false,
    password: __DEV__ ? process.env.SIGNUP_PASSWORD : '',
    confirmPassword: __DEV__ ? process.env.SIGNUP_PASSWORD : '',
  };
  
  const genderOptions: CheckBoxOption<string>[] = Object.keys(genders).reduce(
    (list: CheckBoxOption<string>[], value) => [
      ...list,
      {
        label: genders[value as keyof typeof genders],
        value,
        icon: (
          <MaterialIcons
            name={getGenderIcon(value as Gender) as any}
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

  const handleSignUp = async (values: UserRegistrationFormType) => {
    showLoader();
    const payload: UserRegistrationRequest = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      password: values.password,
    };
    console.log('Payload: ', payload);
    const val = await register(payload);
    hideLoader();

    if (val) {
      console.log('Signup success:', val);

      navigation.navigate('Otp', {
        data: {
          email: values.email,
          password: values.password,
        },
      });
    } else {
      console.log('Signup failed:', userRegistrationError);
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
      const formatted = formatDate(date);
      setFieldValue('dateOfBirth', formatted);
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
            validationSchema={userRegistrationSchema}
            onSubmit={handleSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              isValid,
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
                    icon={<DOBIcon />}
                    onPress={() => setShowDatePicker(true)}
                    title={
                      formatDateString(values.dateOfBirth) || 'DD / MM / YYYY'
                    }
                    titleProps={{
                      color:
                        values.dateOfBirth === '' ? '$placeholder' : '$color',
                    }}
                  />
                  {touched.dateOfBirth && errors.dateOfBirth && (
                    <Text theme={'error_message'}>{errors.dateOfBirth}</Text>
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

                {/* Password */}
                <YStack gap={'$2'}>
                  <LabelledTextField
                    label="Password"
                    placeholder="Enter Your Password"
                    icon={<MaterialIcons name="lock" size={24} />}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text theme={'error_message'}>{errors.password}</Text>
                  )}
                </YStack>

                {/* Confirm Password */}
                <YStack gap={'$2'}>
                  <LabelledTextField
                    label="Confirm Password"
                    placeholder="Confirm Your Password"
                    icon={<MaterialIcons name="lock" size={24} />}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text theme={'error_message'}>
                      {errors.confirmPassword}
                    </Text>
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
                {/* Show Error Message */}
                {userRegistrationError && (
                  <Text size="large" theme={'error_message'} textAlign="center">
                    {userRegistrationError}
                  </Text>
                )}

                {/* Submit */}
                <PrimaryButton
                  title="Continue"
                  onPress={() => handleSubmit()}
                  marginTop="$2"
                  disabled={isSubmitting || !isValid}
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
