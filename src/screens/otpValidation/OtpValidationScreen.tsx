import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, TextInput } from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/core';
import { YStack, Spacer, XStack, View } from 'tamagui';

import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAuth } from '../../context/AuthContext';
import { styles } from './style';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { TitleAndSubtitle } from '@/src/components/common/TitleAndSubtitle';
import { Text } from '@/src/components/common/Text';

type OtpValidationScreenProps = {
  route: RouteProp<RootStackParamList, 'Otp'>;
};

export default function OtpValidationScreen({
  route: {
    params: { data, page },
  },
}: OtpValidationScreenProps) {
  const [input, setInput] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { login } = useAuth();
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

  const handleGetOtp = () => {
    if (page === 'Login') {
      login({ id: '', name: '', email: '' }, 'dddd');
    } else if (page === 'signup') {
      navigation.navigate('ProfileSelection');
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
  const handleResendOtp = () => {
    setTimer(30);
    setResendDisabled(true);
  };
  return (
    <ImageBackground
      source={require('@/assets/images/splashScreen.png')}
      style={styles.imgContainer}
      resizeMode="cover"
    >
      <YStack
        theme="dark"
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <Spacer size="$20" />
        <TitleAndSubtitle marginBottom="$11" />
        <Text font="heading" size="extra_large">
          OTP Verification
        </Text>
        <Text
          font="heading"
          size="normal"
          alignItems="center"
          marginTop="$2"
          textAlign="center"
          paddingHorizontal={'$5'}
        >
          {`We Will Send You A One Time Password On This Mobile Number +91 - 12989200823`}
        </Text>

        <View style={styles.inputWrapper}>
          {input.map((data, index) => (
            <TextInput
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              placeholder="0"
              key={index}
              placeholderTextColor="#999"
              style={styles.input}
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
            Do Not Send OTP?
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
          onPress={handleGetOtp}
          marginTop="$6"
        />
      </YStack>
    </ImageBackground>
  );
}
