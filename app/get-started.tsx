import { Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { YStack } from 'tamagui';
import { TitleAndSubtitle } from '@/components/common/TitleAndSubtitle';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Background } from '@/components/common/Background';
import { NoSafeAreaScreen as Screen } from '@/components/layouts/NoSafeAreaScreen';
import { router } from 'expo-router';

export default function GetStarted() {
  const handleGetStarted = () => {
    router.replace('/(auth)/login');
  };
  const slideAnimation = useRef(new Animated.Value(1000)).current; // Start 100px below

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Screen>
      <Background />
      <YStack
        theme="dark"
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding={'$4'}
      >
        <TitleAndSubtitle marginTop="$20" />
        <Animated.View
          style={[{ width: '100%', transform: [{ translateY: slideAnimation }] }]}
        >
          <PrimaryButton
            title="Get Started"
            onPress={handleGetStarted}
            marginTop="$12"
          />
        </Animated.View>
      </YStack>
    </Screen>
  );
}
