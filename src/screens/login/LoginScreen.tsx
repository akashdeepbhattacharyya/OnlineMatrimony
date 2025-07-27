import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Spacer, XStack, YStack } from 'tamagui';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { TitleAndSubtitle } from '../../components/common/TitleAndSubtitle';
import { TextField } from '../../components/common/TextField';
import EmailIcon from '../../../assets/images/icon_email.svg';
import { CheckBoxButton } from '../../components/common/CheckBoxButton';
import { Text } from '../../components/common/Text';
import { SocialMediaButtons } from '@/src/components/common/SocialMediaButtons';
import { LabelledDivider } from '@/src/components/common/LabelledDivider';
import { Formik } from 'formik';
import { loginSchema } from '@/src/resources/validations/login';
import { useUserAuth } from '@/src/hooks/useUserAuth';
import { useLoader } from '@/src/context/LoaderContext';
import { LoginResponse } from '@/src/models/Authentication';
import { useAuth } from '@/src/context/AuthContext';
import { LoginFormType } from '@/src/resources/form';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { saveUser, saveToken } = useAuth();

  const initialValues = {
    emailOrPhone: __DEV__ ? process.env.LOGIN_PHONE_NO : '',
    password: __DEV__ ? process.env.LOGIN_PASSWORD : '',
    terms: __DEV__ ? true : false,
  };
  const { login: loginUser, error: loginError } = useUserAuth();
  const { showLoader, hideLoader } = useLoader();

  const handleLogin = async (values: LoginFormType) => {
    console.log('Login values:', values);
    showLoader();
    const response = await loginUser({
      emailOrPhone: values.emailOrPhone,
      password: values.password,
      rememberMe: true,
    });
    if (response) {
      saveToken({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        tokenType: response.tokenType,
        expiresIn: response.expiresIn,
      });
      saveUser(response.user);
      console.log('Login successful:', response);
    } else {
      console.log('Login failed:', loginError);
    }
    hideLoader();
  };

  return (
    <ImageBackground
      source={require('@/assets/images/splashScreen.png')}
      style={styles.imgContainer}
      resizeMode="cover"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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
          <YStack
            theme="dark"
            flex={1}
            justifyContent="center"
            alignItems="center"
            padding="$4"
          >
            <Spacer size="$20" />
            <TitleAndSubtitle marginBottom="$11" />

            {/* Email or Phone */}
            <YStack width={'100%'} gap={'$2'}>
              <TextField
                placeholder="Enter your Email Id / Mobile No."
                icon={<EmailIcon />}
                onChangeText={handleChange('emailOrPhone')}
                onBlur={handleBlur('emailOrPhone')}
                value={values.emailOrPhone}
              />
              {touched.emailOrPhone && errors.emailOrPhone && (
                <Text theme={'error_message'}>{errors.emailOrPhone}</Text>
              )}
            </YStack>

            {/* Password */}
            <YStack width={'100%'} gap={'$2'} marginTop="$4">
              <TextField
                placeholder="Enter your Password"
                icon={<MaterialIcons name="lock" size={24} />}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text theme={'error_message'}>{errors.password}</Text>
              )}
            </YStack>

            <YStack gap={'$2'} paddingVertical={'$4'}>
              <CheckBoxButton
                option={{
                  label: 'Terms & Condition & Privacy Policy',
                  value: 'terms',
                }}
                selected={values.terms}
                onChange={() => setFieldValue('terms', !values.terms)}
                paddingHorizontal={'$8'}
              />
              {touched.terms && errors.terms && (
                <Text theme={'error_message'} paddingHorizontal={'$8'}>
                  {errors.terms}
                </Text>
              )}
            </YStack>

            <PrimaryButton
              title="Get OTP"
              onPress={() => handleSubmit()}
              marginTop="$4"
              disabled={isSubmitting || !isValid}
            />
            <LabelledDivider label={`Or`} width={'35%'} marginTop="$4" />

            <SocialMediaButtons
              marginTop="$4"
              onGoogle={() => {}}
              onFacebook={() => {}}
            />
            <XStack
              theme={'sign_up_button'}
              marginTop="$6"
              justifyContent="center"
              alignItems="center"
              gap="$2"
            >
              <Text size="small" font="heading" color="$color">
                Don't have An Account?
              </Text>
              <Text
                size="normal"
                font="heading"
                color="$background"
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign Up
              </Text>
            </XStack>
          </YStack>
        )}
      </Formik>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 120,
    marginHorizontal: 20,
  },
  logo: {
    fontFamily: 'Oswald-Bold',
    fontSize: 48,
    color: '#fff',
    textAlign: 'center',
    transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  tagline: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 35,
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    height: 70,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  inputIcon: {
    marginLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    color: '#000000',
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: 'Roboto-Regular',
  },
  checkboxWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 80,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  checkedCheckbox: {
    backgroundColor: '#F74D4D',
    borderColor: '#F74D4D',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 13,
    flexShrink: 1,
    fontFamily: 'Roboto-Regular',
    transform: [{ scaleX: 1.3 }, { scaleY: 1.4 }],
    paddingLeft: 20,
  },
  otpButton: {
    backgroundColor: '#F74D4D',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    height: 70,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
  },
  divider: {
    height: 1, // Set the height of the line
    width: '40%', // Adjust width as needed
    backgroundColor: '#ccc', // Set the color of the line
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  socialButton: {
    borderRadius: 100,
  },
  socialIcon: {
    width: 85,
    height: 85,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    maxWidth: 335,
    gap: 30,
  },
  signupText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  signupLink: {
    color: '#F74D4D',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  textWrapper: {
    flexDirection: 'row', // Aligns the texts horizontally
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc', // Line color
    marginHorizontal: 10,
    width: '10%', // Space between the line and the text
  },
  dashedDivider: {
    fontSize: 18,
    color: '#fff', // Color of the text 'or'
    fontFamily: 'Roboto-Regular',
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
});

export default LoginScreen;
