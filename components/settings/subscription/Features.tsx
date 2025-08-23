import { SubscriptionFeatures } from "@/models/SubscriptionPlan";
import { formatSubscriptionPlanFeature } from "@/utils/utils";
import { XStack, YStack } from "tamagui";
import { Text } from "../../common/Text";
import WhiteCheckIcon from "@/assets/images/check-white.svg";
import PrimaryCheckIcon from '@/assets/images/check-primary.svg';

type Props = {
  features: SubscriptionFeatures;
  plan: 'current' | 'next';
};

export const Features = ({ features, plan }: Props) => {
  return (
    <YStack gap={'$2'}>
      {Object.entries(features).map(([key, value]) => {
        if (typeof value === 'boolean' && !value) return null;
        if (typeof value === 'number' && value <= 0) return null;

        const featureDescription = formatSubscriptionPlanFeature(key as keyof SubscriptionFeatures, value);
        return <FeatureItem key={key} featureDescription={featureDescription} plan={plan} />;
      })}
    </YStack>
  );
};

const FeatureItem = ({ featureDescription, plan }: { featureDescription: string; plan: 'current' | 'next' }) => {
  return (
    <XStack alignItems="center" gap={'$3'}>
      {plan === 'current' ? <WhiteCheckIcon color={'$background'} /> : <PrimaryCheckIcon color={'$background'} />}
      <Text font="heading">{featureDescription}</Text>
    </XStack>
  );
};
