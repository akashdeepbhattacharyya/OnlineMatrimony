import React, { useRef, useState } from 'react';
import { ScrollView, FlatList, Dimensions } from 'react-native';
import { YStack, View } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { Text } from '@/src/components/common/Text';
import { SubscriptionPlan } from '@/src/models/SubscriptionPlan';
import { CurrentPlan } from '@/src/components/settings/subscription/CurrentPlan';
import { NextPlan } from '@/src/components/settings/subscription/NextPlan';
import { SubscriptionBanner } from '@/src/components/settings/subscription/SubscriptionBanner';

const subscriptionData: SubscriptionPlan[] = [
  {
    id: '1',
    title: 'Regular Plan',
    price: '₹1100',
    time: '11',
    features: [
      'Viewing extended match lists',
      'Unlocking regular profiles information',
      'Active chat limit: 6 accounts',
      '4 matches per week',
    ],
  },
  {
    id: '2',
    title: 'Pro Plan',
    price: '₹5100',
    time: '52',
    features: [
      'Viewing extended match lists',
      'Enhanced profile visibility to get more attention',
      'Active chat limit: 10 accounts',
      '6 matches per week',
      'Search and Send Interest options',
    ],
  },
];

const SubscriptionScreen = () => {
  const flatListRef = useRef<FlatList<SubscriptionPlan>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');

  return (
    <Screen>
      <ScreenHeader headerText="Subscription & Membership" />
      <ScrollView>
        <YStack padding="$4" marginBottom={'$4'}>
          <SubscriptionBanner />

          <YStack marginTop={'$7'} alignItems="center" gap={'$1.5'}>
            <Text font="headingBold" size="extra_large" color={'$color'}>
              Go Premium
            </Text>
            <Text font="headingLight" size="small" color={'$subtitle'}>
              No Commitment. Cancel Anytime.
            </Text>
          </YStack>

          <View marginTop={'$7'}>
            <FlatList
              ref={flatListRef}
              data={subscriptionData}
              renderItem={({ item, index }) => {
                const isActive = index === currentIndex;
                return isActive ? (
                  <CurrentPlan
                    subscriptionPlan={item}
                    index={
                      index === 0
                        ? 'first'
                        : index === subscriptionData.length - 1
                        ? 'last'
                        : 'middle'
                    }
                    onStartPlan={() => {}}
                  />
                ) : (
                  <NextPlan subscriptionPlan={item} onStartPlan={() => {}} />
                );
              }}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={e => {
                const newIndex = Math.round(
                  e.nativeEvent.contentOffset.x / width,
                );
                setCurrentIndex(newIndex);
              }}
            />
          </View>
        </YStack>
      </ScrollView>
    </Screen>
  );
};

export default SubscriptionScreen;
