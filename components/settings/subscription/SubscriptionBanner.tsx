import { LinearGradient } from 'expo-linear-gradient';
import { View, Image, getToken, XStack, YStack } from 'tamagui';
import { Text } from '../../common/Text';

export const SubscriptionBanner = () => {
  return (
    <View
      theme={'subscription_banner'}
      borderRadius={'$8'}
      overflow="hidden"
      width={'100%'}
      height={175}
    >
      <Image
        source={require('@/assets/images/subscription-banner.png')}
        position="absolute"
        objectFit="cover"
        width="100%"
        height={175}
      />
      <LinearGradient
        colors={[
          getToken('$color.black_40'),
          getToken('$color.black_85'),
          getToken('$color.black'),
        ]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 12,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0, y: 0 }}
        locations={[0, 0.7, 1]}
      />
      <XStack marginTop={'$6'} padding={'$4'} gap={'$4'}>
        <YStack
          theme={'subscription_banner_savings'}
          borderRadius={'$12'}
          backgroundColor={'$background'}
          paddingHorizontal={'$3'}
          paddingVertical={'$5'}
          alignItems="center"
          justifyContent="center"
        >
          <Text font="headingBold" size="normal" color={'$color'}>
            Save Upto
          </Text>
          <Text font="headingBold" size="extra_large" color={'$color'}>
            40%
          </Text>
        </YStack>
        <YStack gap={'$1'} alignItems="flex-start" justifyContent="center">
          <Text font="heading" size="normal" color={'$color'}>
            Make Your
          </Text>
          <Text font="headingBold" size="extra_large" color={'$color'}>
            Wedding
          </Text>
          <Text font="headingBold" size="extra_large" color={'$color'}>
            Memorable
          </Text>
        </YStack>
      </XStack>
    </View>
  );
};
