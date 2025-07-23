import { View, ViewProps, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { UserProfile } from '@/src/models/User';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const BasicInformation = ({ userProfile, ...props }: Props) => {
  return (
    <YStack gap={'$4'} {...props}>
      <YStack alignItems="center">
        <Text font="heading" size="large" marginTop="$3">
          {userProfile.personalInformation.fullName}
        </Text>
        <Text font="headingLight" size="small" marginTop="$1">
          {userProfile.email}
        </Text>
      </YStack>
      <XStack gap={'$10'} justifyContent="center">
        <YStack alignItems="center" gap={'$2'}>
          <Text font="heading" size="extra_large">
            {userProfile.acceptedCount}
          </Text>
          <Text font="headingLight" size="extra_small">
            {`Accepted`}
          </Text>
        </YStack>
        <YStack alignItems="center" gap={'$2'}>
          <Text font="heading" size="extra_large">
            {userProfile.receivedCount}
          </Text>
          <Text font="headingLight" size="extra_small">
            {`Received`}
          </Text>
        </YStack>
        <YStack alignItems="center" gap={'$2'}>
          <Text font="heading" size="extra_large">
            {userProfile.sentCount}
          </Text>
          <Text font="headingLight" size="extra_small">
            {`Sent`}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
};
