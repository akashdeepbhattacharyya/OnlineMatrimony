import { TouchableOpacity } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { NoSafeAreaScreen as Screen } from '@/components/layouts/NoSafeAreaScreen';
import { TitleAndSubtitle } from '@/components/common/TitleAndSubtitle';
import { Text } from '@/components/common/Text';
import BrideGroomBlob from '@/assets/images/bride-groom.svg';
import { YStack } from 'tamagui';
import { useLoader } from '@/context/LoaderContext';
import { useAuth } from '@/context/AuthContext';
import { useUserAuth } from '@/hooks/useUserAuth';
import { router, useLocalSearchParams } from 'expo-router';

export default function ProfileSelection() {
  const { showLoader, hideLoader } = useLoader();
  const { saveUser, saveToken } = useAuth();
  const { login: loginUser, error: loginError } = useUserAuth();
  const { email, password } = useLocalSearchParams<{
    email: string;
    password: string;
  }>();


  const handleLogin = async () => {
    console.log('Login values:', { email, password });
    showLoader();
    const response = await loginUser({
      emailOrPhone: email,
      password: password,
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
      router.push({
        pathname: '/(app)/(tabs)',
      });
    } else {
      console.log('Login failed:', loginError);
    }
    hideLoader();
  };

  return (
    <Screen theme="dark" alignItems="center" justifyContent="center">
      <TitleAndSubtitle />

      <YStack alignItems="center" marginTop={'$10'}>
        <Text font="heading" size="extra_large">{`Who am I`}</Text>
        <TouchableOpacity onPress={() => handleLogin()}>
          <BrideGroomBlob />
        </TouchableOpacity>
      </YStack>
    </Screen>
  );
}
