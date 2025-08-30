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
import { useStoreUser } from '@/hooks/useStoreUser';
import { router } from 'expo-router';
import { useError } from '@/components/error/useError';

export default function PurchaseSubscription() {
  const flatListRef = useRef<FlatList<SubscriptionPlan>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const { initiatePayment, paymentSuccess, paymentFailure } = usePayment();
  const { phone, email, userProfile } = useAppSelector(state => state.user);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionPlan[]>([]);
  const { getSubscriptionPlans, subscribeToPlan, createOrder } = useSubscriptionRepository();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | undefined>(undefined);
  const { storeSubscription } = useStoreUser();
  const { showError } = useError();
  
  useEffect(() => {
    if (paymentFailure) {
      showError({ description: paymentFailure.description });
    }
  }, [paymentFailure, showError]);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      const plans = await getSubscriptionPlans();
      setSubscriptionData(plans);
    };

    fetchSubscriptionPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (paymentSuccess) {
        // Handle post-payment success actions here
        console.log('Payment Successful with ID:', paymentSuccess.orderId);
        if (selectedPlan) {
          try {
            const subscription = await subscribeToPlan(selectedPlan.id, paymentSuccess.orderId, paymentSuccess.paymentId, paymentSuccess.signature);
            storeSubscription(subscription);
            console.log('Subscription to plan successful:', subscription);
            router.replace({
              pathname: '/(app)/(tabs)',
            });
          } catch (error: any) {
            showError({ description: error.message || 'Subscription failed' });
          }
        }
      }
    };
    handlePaymentSuccess();
  }, [paymentSuccess, selectedPlan, showError, storeSubscription, subscribeToPlan]);

  const onStartPlan = async (plan: SubscriptionPlan) => {
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
      showError({ description: error.message || 'Failed to create order' });
    }
  };


  return (
    <Screen>
      <ScreenHeader headerText="Subscription & Membership" screenType='onboarding' />
      <ScrollView>
        <YStack padding="$4" marginBottom={'$4'}>
          <SubscriptionBanner />

          <YStack marginTop={'$7'} alignItems="center" gap={'$1.5'}>
            <Text font="headingBold" size="extra_large" color={'$color'}>
              Go Premium
            </Text>
          </YStack>

          {paymentFailure && (
            <Text
              font="body"
              size='medium'
              color="$color.button_bg_red"
              marginTop="$4"
              textAlign='center'
              padding={'$2.5'}
              borderWidth={2}
              borderColor="$color.button_bg_red"
              borderRadius={"$4"}
            >
              {paymentFailure.description}
            </Text>
          )}

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