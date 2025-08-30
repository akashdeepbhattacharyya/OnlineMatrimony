import { TouchableOpacity } from 'react-native';
import React from 'react';
import { NoSafeAreaScreen as Screen } from '@/components/layouts/NoSafeAreaScreen';
import { TitleAndSubtitle } from '@/components/common/TitleAndSubtitle';
import { Text } from '@/components/common/Text';
import BrideGroomBlob from '@/assets/images/bride-groom.svg';
import { YStack } from 'tamagui';
import { useLoader } from '@/components/loader/LoaderContext';
import { useUserAuth } from '@/services/hooks/useUserAuth';
import { router, useLocalSearchParams } from 'expo-router';
import { useStoreUser } from '@/hooks/useStoreUser';

export default function ProfileSelection() {
  const { showLoader, hideLoader } = useLoader();
  const { login: loginUser, error: loginError } = useUserAuth();
  const { email, password } = useLocalSearchParams<{
    email: string;
    password: string;
  }>();
  const { storeUser, storePartnerPreferences, storeUserProfile } = useStoreUser();

  const handleLogin = async () => {
    showLoader();
    const response = await loginUser({
      emailOrPhone: email,
      password: password,
      rememberMe: true,
    });
    if (response) {
      storeUser(
        response.user,
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          tokenType: response.tokenType,
          expiresIn: response.expiresIn,
        }
      );

      if (response.user.preference) {
        storePartnerPreferences(response.user.preference);
      }
      storeUserProfile(response.user.profile);
      router.push({
        pathname: '/(profile)/(update)',
        params: { purpose: 'ONBOARDING' },
      });
    } else {
      console.error('Login failed:', loginError);
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
