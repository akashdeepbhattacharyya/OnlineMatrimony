import { YStack } from 'tamagui';
import { Text } from '../../common/Text';
import { Dimensions } from 'react-native';
import { PrimaryButton } from '../../common/PrimaryButton';
import { SubscriptionPlan } from '@/src/models/SubscriptionPlan';
import { Features } from './Features';

type Props = {
  subscriptionPlan: SubscriptionPlan;
  index: 'last' | 'first' | 'middle';
  onStartPlan: () => void;
};

export const CurrentPlan = ({
  subscriptionPlan,
  index,
  onStartPlan,
}: Props) => {
  const { width } = Dimensions.get('window');

  return (
    <YStack
      theme={'subscription_current_plan'}
      backgroundColor={'$background'}
      width={width - 100}
      marginRight={index === 'first' ? '$6' : index === 'last' ? 0 : '$3'}
      marginLeft={index === 'last' ? '$6' : index === 'first' ? 0 : '$3'}
      borderRadius={'$8'}
      paddingHorizontal={'$4'}
      paddingTop={'$4'}
      justifyContent="space-between"
      gap={'$6'}
    >
      <YStack justifyContent="space-between" gap={'$8'}>
        <YStack alignItems="center" justifyContent="center" gap={'$6'}>
          <Text font="heading" size="extra_large">
            {subscriptionPlan.name}
          </Text>
          <YStack alignItems="center">
            <Text font="headingBold" size="double_extra_large">
              {`₹${subscriptionPlan.price}`}
            </Text>
            <Text font="heading" size="small">
              {subscriptionPlan.durationMonths} weeks
            </Text>
          </YStack>
        </YStack>
        <Features features={subscriptionPlan.features} plan="current" />
      </YStack>
      <PrimaryButton
        title="Start Plan"
        theme="secondary_button"
        onPress={onStartPlan}
        marginBottom={'$4'}
      />
    </YStack>
  );
};
