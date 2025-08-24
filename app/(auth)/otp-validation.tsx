import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { YStack, Spacer, XStack, View } from 'tamagui';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { TitleAndSubtitle } from '@/components/common/TitleAndSubtitle';
import { Text } from '@/components/common/Text';
import { useUserAuth } from '@/services/hooks/useUserAuth';
import { useLoader } from '@/context/LoaderContext';
import { NoSafeAreaScreen as Screen } from '@/components/layouts/NoSafeAreaScreen';
import { Background } from '@/components/common/Background';
import { router, useLocalSearchParams } from 'expo-router';

export default function OtpValidation() {
  const [input, setInput] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { showLoader, hideLoader } = useLoader();
  const { resendOtp, error, submitOtp } = useUserAuth();
  const { email, password } = useLocalSearchParams<{
    email: string;
    password: string;
  }>();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setResendDisabled(false);
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleSubmitOtp = async () => {
    showLoader();
    console.log(email, input.join(''));

    const value = await submitOtp({
      email,
      otp: input.join(''),
      purpose: 'REGISTRATION',
    });
    hideLoader();
    if (value) {
      router.push({
        pathname: '/(auth)/profile-selection',
        params: { email, password },
      });
    } else {
      console.log('OTP submission failed:', error);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...input];
    newOtp[index] = value;
    setInput(newOtp);
    if (value && index < input.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    showLoader();
    const val = await resendOtp(email, 'REGISTRATION');
    setTimer(30);
    setResendDisabled(true);
    hideLoader();
    if (val) {
      setInput(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <Screen>
      <Background endLocation={0.3} />
      <YStack
        theme="dark"
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <Spacer size="$20" />
        <TitleAndSubtitle marginBottom="$11" />
        <Text font="headingBold" size="extra_large">
          OTP Verification
        </Text>
        <Text
          font="heading"
          size="small"
          alignItems="center"
          marginTop="$2"
          textAlign="center"
          paddingHorizontal={'$5'}
        >
          {`We Will Send You A One Time Password On This Email ${email}`}
        </Text>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: 20
        }}>
          {input.map((data, index) => (
            <TextInput
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              placeholder="0"
              key={index}
              placeholderTextColor="#999"
              style={{
                backgroundColor: '#fff',
                color: '#000000',
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                width: 56,
                height: 56,
                textAlign: 'center',
                borderRadius: 100,
              }}
              value={data}
              onChangeText={(value: string) => handleOtpChange(value, index)}
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !data && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
            />
          ))}
        </View>
        {error && (
          <Text size="large" theme={'error_message'} textAlign="center">
            {error}
          </Text>
        )}
        <Text font="heading" size="normal">
          {`00:${timer < 10 ? `0${timer}` : timer}`}
        </Text>
        <XStack
          theme={'sign_up_button'}
          marginTop="$3"
          justifyContent="center"
          alignItems="center"
          gap="$2"
        >
          <Text size="small" font="heading" color="$color">
            Did Not Receive OTP?
          </Text>
          <Text
            size="normal"
            font="heading"
            color="$background"
            onPress={handleResendOtp}
            disabled={resendDisabled}
          >
            Resend OTP
          </Text>
        </XStack>

        <PrimaryButton
          title="Submit And Login"
          onPress={handleSubmitOtp}
          marginTop="$6"
        />
      </YStack>
    </Screen>
  );
}
