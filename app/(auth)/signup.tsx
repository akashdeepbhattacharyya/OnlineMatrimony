import { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useLoader } from '../../context/LoaderContext';
import { CheckBoxButton } from '@/components/common/CheckBoxButton';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { TitleAndSubtitle } from '@/components/common/TitleAndSubtitle';
import { YStack, XStack } from 'tamagui';
import { LabelledTextField } from '@/components/common/LabelledTextField';
import PersonIcon from '@/assets/images/icon_person.svg';
import EmailIcon from '@/assets/images/icon_email.svg';
import PhoneIcon from '@/assets/images/icon_phone.svg';
import { LabelledButton } from '@/components/common/LabelledButton';
import { Text } from '@/components/common/Text';
import { CheckBoxButtonGroup } from '@/components/common/CheckBoxButtonGroup';
import { Gender, genderOptionsWithIcons } from '@/resources/gender';
import { Option, UserRegistrationFormType } from '@/resources/form';
import { SocialMediaButtons } from '@/components/common/SocialMediaButtons';
import { LabelledDivider } from '@/components/common/LabelledDivider';
import { useUserAuth } from '@/services/hooks/useUserAuth';
import { userRegistrationSchema } from '@/resources/validations/user-registration';
import { UserRegistrationRequest } from '@/models/Authentication';
import {
  formatDate,
  formatDateString,
  parseDate,
} from '@/utils/dateFormatter';
import DOBIcon from '@/assets/images/icon-dob.svg';
import { DateTimePicker } from '@/components/common/DateTimePicker';
import { NoSafeAreaScreen as Screen } from '@/components/layouts/NoSafeAreaScreen';
import { Background } from '@/components/common/Background';
import { router } from 'expo-router';

export default function SignUp() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(
    __DEV__ ? process.env.SIGNUP_GENDER : undefined,
  );
  const { register, error: userRegistrationError } = useUserAuth();

  const randomValue = Math.floor(Math.random() * (99 - 30 + 1)) + 30;

  const initialValues = {
    fullName: __DEV__ ? `John Doe` : '',
    email: __DEV__ ? `johndoe${randomValue}@example.com` : '',
    phone: __DEV__ ? `98765432${randomValue}` : '',
    dateOfBirth: __DEV__ ? `1990-01-01` : '',
    gender: __DEV__ ? `MALE` : '',
    terms: __DEV__ ? true : false,
    password: __DEV__ ? `Boxer@1998` : '',
    confirmPassword: __DEV__ ? `Boxer@1998` : '',
  };

  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (userRegistrationError) {
      Alert.alert('Registration Error', userRegistrationError);
    }
  }, [userRegistrationError]);

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
      router.push({
        pathname: '/(auth)/otp-validation',
        params: {
          email: values.email,
          password: values.password,
        },
      });
    }
  };

  const handleGenderChange = (option: Option<Gender>, setFieldValue: any) => {
    setFieldValue('gender', option.value);
    setSelectedGender(option.value);
  };

  return (
    <Screen>
      <Background endLocation={0.3} />
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
                      options={genderOptionsWithIcons(selectedGender)}
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

                <DateTimePicker
                  isVisible={showDatePicker}
                  mode="date"
                  onConfirm={date => {
                    setFieldValue('dateOfBirth', formatDate(date));
                    setShowDatePicker(false);
                  }}
                  onCancel={() => setShowDatePicker(false)}
                  selectedDate={
                    values.dateOfBirth
                      ? parseDate(values.dateOfBirth)
                      : undefined
                  }
                />
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

                <SocialMediaButtons onGoogle={() => { }} onFacebook={() => { }} />
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
                    onPress={() => router.back()}
                  >
                    {`Sign In`}
                  </Text>
                </XStack>
              </YStack>
            )}
          </Formik>
        </YStack>
      </ScrollView>
    </Screen>
  );
}
