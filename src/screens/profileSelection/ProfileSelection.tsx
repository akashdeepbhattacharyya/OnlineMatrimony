import { TouchableOpacity } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { TitleAndSubtitle } from '@/src/components/common/TitleAndSubtitle';
import { Text } from '@/src/components/common/Text';
import BrideGroomBlob from '@/assets/images/bride-groom.svg';
import { YStack } from 'tamagui';
import { useLoader } from '@/src/context/LoaderContext';
import { useAuth } from '@/src/context/AuthContext';
import { useUserAuth } from '@/src/hooks/useUserAuth';

type Props = {
  route: RouteProp<RootStackParamList, 'ProfileSelection'>;
};

export default function ProfileSelection({
  route: {
    params: {
      data: { email, password },
    },
  },
}: Props) {
  const { showLoader, hideLoader } = useLoader();
  const { saveUser, saveToken } = useAuth();

  const { login: loginUser, error: loginError } = useUserAuth();

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
