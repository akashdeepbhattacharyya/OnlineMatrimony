import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, FlatList, Dimensions } from 'react-native';
import { YStack, View } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Text } from '@/components/common/Text';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { CurrentPlan } from '@/components/settings/subscription/CurrentPlan';
import { NextPlan } from '@/components/settings/subscription/NextPlan';
import { usePayment } from '@/hooks/usePayment';
import { useAppSelector } from '@/services/store/hook';
import { useSubscriptionRepository } from '@/services/api/repositories/useSubscriptionRepository';

const SubscriptionScreen = () => {
  const flatListRef = useRef<FlatList<SubscriptionPlan>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const { initiatePayment, paymentSuccess, paymentFailure } = usePayment();
  const { userProfile, email, phone, subscription } = useAppSelector(state => state.user);
  const { subscriptionPlans } = useAppSelector(state => state.subscriptionPlans);
  const { subscribeToPlan } = useSubscriptionRepository();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | undefined>(undefined);
  const [filteredPlans, setFilteredPlans] = useState<SubscriptionPlan[] | undefined>(undefined);

  useEffect(() => {
    const filterPlans = () => {
      if (!subscriptionPlans) return;
      const filtered = subscriptionPlans.filter(plan => {
        return plan.price >= (subscription?.amountPaid ?? 0);
      });
      setFilteredPlans(filtered);
    };

    filterPlans();
  }, [subscription?.amountPaid, subscriptionPlans]);

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
  }, [paymentSuccess, selectedPlan, subscribeToPlan]);

  useEffect(() => {
    if (paymentFailure) {
      // Handle payment failure actions here
      console.error('Payment Failed:', paymentFailure.description);
    }
  }, [paymentFailure]);

  const onStartPlan = async (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    const contact = phone;
    const name = userProfile?.fullName;

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

          <YStack marginTop={'$2'} gap={'$1.5'}>
            <Text font="headingBold" size="extra_large" color={'$color'}>
              Current Plan
            </Text>
          </YStack>

          <View marginTop={'$7'}>
            <FlatList
              ref={flatListRef}
              data={filteredPlans}
              renderItem={({ item, index }) => {
                const isActive = index === currentIndex;
                return isActive ? (
                  <CurrentPlan
                    subscriptionPlan={item}
                    subscription={subscription}
                    planCount={filteredPlans?.length}
                    index={
                      index === 0
                        ? 'first'
                        : index === subscriptionPlans.length - 1
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
