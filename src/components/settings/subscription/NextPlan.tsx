import PrimaryCheckIcon from '@/assets/images/check-primary.svg';
import { SubscriptionPlan } from '@/src/models/SubscriptionPlan';
import { View, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { PrimaryButton } from '../../common/PrimaryButton';
import { Dimensions } from 'react-native';
import { formatSubscriptionPlanFeature } from '@/src/utils/utils';
import { Features } from './Features';

type Props = {
  subscriptionPlan: SubscriptionPlan;
  onStartPlan: () => void;
};

export const NextPlan = ({ subscriptionPlan, onStartPlan }: Props) => {
  const { width } = Dimensions.get('window');

  return (
    <View paddingVertical={'$6'}>
      <YStack
        theme={'subscription_next_plan'}
        backgroundColor={'$background'}
        width={width - 100}
        borderRadius={'$8'}
        paddingHorizontal={'$4'}
        paddingTop={'$4'}
        justifyContent="space-between"
        gap={'$4'}
      >
        <YStack justifyContent="space-between" gap={'$6'}>
          <YStack alignItems="center" justifyContent="space-between" gap={'$4'}>
            <Text font="heading" size="extra_large">
              {subscriptionPlan.name}
            </Text>
            <YStack alignItems="center">
              <Text
                font="headingBold"
                size="double_extra_large"
                justifyContent="space-between"
              >
                {`₹${subscriptionPlan.price}`}
              </Text>
              <Text font="heading" size="small">
                {subscriptionPlan.durationMonths} weeks
              </Text>
            </YStack>
          </YStack>
          <Features features={subscriptionPlan.features} plan="next" />
        </YStack>
        <PrimaryButton
          title="Start Plan"
          theme="primary_button"
          onPress={onStartPlan}
          marginBottom={'$4'}
        />
      </YStack>
    </View>
  );
};
