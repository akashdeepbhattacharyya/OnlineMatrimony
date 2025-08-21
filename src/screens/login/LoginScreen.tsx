import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { XStack, YStack } from 'tamagui';
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
import { useAuth } from '@/src/context/AuthContext';
import { LoginFormType } from '@/src/resources/form';
import { MaterialIcons } from '@expo/vector-icons';
import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { Background } from '@/src/components/common/Background';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { saveUser, saveToken, savePartnerPreferences } = useAuth();

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
      savePartnerPreferences(response.user.preference);
      console.log('Login successful:', response);
    } else {
      console.log('Login failed:', loginError);
    }
    hideLoader();
  };

  return (
    <Screen>
      <Background endLocation={0.25} />
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
              title="Continue"
              onPress={() => handleSubmit()}
              marginTop="$4"
              disabled={isSubmitting || !isValid}
            />
            <LabelledDivider label={`Or`} width={'35%'} marginTop="$4" />

            <SocialMediaButtons
              marginTop="$4"
              onGoogle={() => { }}
              onFacebook={() => { }}
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
    </Screen>
  );
};

export default LoginScreen;
