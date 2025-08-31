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
import { useStoreUser } from '@/hooks/useStoreUser';
import { router } from 'expo-router';
import { useError } from '@/components/error';

const SubscriptionScreen = () => {
  const flatListRef = useRef<FlatList<SubscriptionPlan>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const { initiatePayment, paymentSuccess, paymentFailure } = usePayment();
  const { userProfile, email, phone, subscription } = useAppSelector(state => state.user);
  const { subscriptionPlans } = useAppSelector(state => state.subscriptionPlans);
  const { subscribeToPlan, createOrder } = useSubscriptionRepository();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | undefined>(undefined);
  const { storeSubscription } = useStoreUser();
  const { showError } = useError();

  useEffect(() => {
    if (paymentFailure) {
      showError({ description: paymentFailure.description });
    }
  }, [paymentFailure, showError]);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (paymentSuccess) {
        // Handle post-payment success actions here
        if (selectedPlan) {
          try {
            const subscription = await subscribeToPlan(selectedPlan.id, paymentSuccess.orderId, paymentSuccess.paymentId, paymentSuccess.signature);
            storeSubscription(subscription);
            if (router.canGoBack()) {
              router.back();
            }
          } catch (error: any) {
            showError({ description: error.message || 'Error subscribing to plan' });
          }
        }
      }
    };
    handlePaymentSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentSuccess, selectedPlan, showError, storeSubscription]);

  const onStartPlan = async (plan: SubscriptionPlan) => {
    if (subscription) {
      const isPremium = subscriptionPlans.find(p => p.id === subscription.planId);
      if (isPremium) {
        showError({ description: 'You are already on a premium plan. Please contact support to change your plan.' });
        return;
      }
    }
    setSelectedPlan(plan);
    try {
      const order = await createOrder(plan.id);
      const contact = phone;
      const name = userProfile.fullName;

      await initiatePayment({
        description: plan.name,
        amount: plan.price,
        prefill: {
          email,
          contact,
          name,
        },
        orderId: order.id,
      });
    } catch (error: any) {
      showError({ description: error.message || 'Error initiating payment' });
    }
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
            <Text font="heading" size="small" color={'$color'}>
              {subscription?.planName}
            </Text>
          </YStack>

          <View marginTop={'$7'}>
            <FlatList
              ref={flatListRef}
              data={subscriptionPlans}
              renderItem={({ item, index }) => {
                const isActive = index === currentIndex;
                return isActive ? (
                  <CurrentPlan
                    subscriptionPlan={item}
                    subscription={subscription}
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
              keyExtractor={item => item.id.toString()}
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
          <Text font="heading" size="small" color={'$color'} marginTop={"$10"}>
            General Terms:
          </Text>
          <Text font="heading" size="small" color={'$color.gray_lighter'} marginTop={"$5"}>
            Privacy control for all users (They can allow/disallow their appearance in Manual Search results to receive direct Interest)
          </Text>

        </YStack>
      </ScrollView>
    </Screen>
  );
};

export default SubscriptionScreen;
