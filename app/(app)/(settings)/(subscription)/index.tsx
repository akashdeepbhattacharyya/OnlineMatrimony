import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, FlatList, Dimensions } from 'react-native';
import { YStack, View } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Text } from '@/components/common/Text';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { CurrentPlan } from '@/components/settings/subscription/CurrentPlan';
import { NextPlan } from '@/components/settings/subscription/NextPlan';
import { SubscriptionBanner } from '@/components/settings/subscription/SubscriptionBanner';
import { usePayment } from '@/hooks/usePayment';
import { useAppSelector } from '@/services/store/hook';
import { useSubscriptionRepository } from '@/services/api/repositories/useSubscriptionRepository';

const SubscriptionScreen = () => {
  const flatListRef = useRef<FlatList<SubscriptionPlan>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const { initiatePayment, paymentSuccess, paymentFailure } = usePayment();
  const { userData } = useAppSelector(state => state.user);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionPlan[]>([]);
  const { getSubscriptionPlans, subscribeToPlan } = useSubscriptionRepository();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | undefined>(undefined);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      const plans = await getSubscriptionPlans();
      setSubscriptionData(plans);
    };

    fetchSubscriptionPlans();
  }, []);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (paymentSuccess) {
        // Handle post-payment success actions here
        console.log('Payment Successful with ID:', paymentSuccess.id);
        if (selectedPlan) {
          await subscribeToPlan(selectedPlan.id, paymentSuccess.id);
        }
      }
    };
    handlePaymentSuccess();
  }, [paymentSuccess]);

  useEffect(() => {
    if (paymentFailure) {
      // Handle payment failure actions here
      console.error('Payment Failed:', paymentFailure.description);
    }
  }, [paymentFailure]);

  const onStartPlan = async (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    const contact = userData.phone;
    const email = userData.email;
    const name = userData.profile.fullName;

    await initiatePayment({
      description: plan.name,
      amount: plan.price,
      prefill: {
        email,
        contact,
        name,
      },
    });
  };


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
                    onStartPlan={() => onStartPlan(item)}
                  />
                ) : (
                  <NextPlan subscriptionPlan={item} onStartPlan={() => onStartPlan(item)} />
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
