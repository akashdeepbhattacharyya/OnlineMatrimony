import { ImageBackground, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { styles } from './style';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { YStack } from 'tamagui';
import { TitleAndSubtitle } from '../../components/common/TitleAndSubtitle';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export default function Onboarding() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };
  const slideAnim = useRef(new Animated.Value(1000)).current; // Start 100px below

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/splashScreen.png')}
      style={styles.imgContainer}
      resizeMode="cover"
    >
      <YStack theme="dark" flex={1} justifyContent="center" alignItems="center">
        <TitleAndSubtitle marginTop="$20" />
        <Animated.View style={[{ transform: [{ translateY: slideAnim }] }]}>
          <PrimaryButton
            title="Get Started"
            onPress={handleGetStarted}
            marginTop="$12"
          />
        </Animated.View>
      </YStack>
    </ImageBackground>
  );
}
