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
        <BasicInformationCountRow
          count={userProfile.acceptedCount}
          label="Accepted"
        />
        <BasicInformationCountRow
          count={userProfile.receivedCount}
          label="Received"
        />
        <BasicInformationCountRow count={userProfile.sentCount} label="Sent" />
      </XStack>
    </YStack>
  );
};

const BasicInformationCountRow = ({
  count,
  label,
}: {
  count: number;
  label: string;
}) => {
  return (
    <YStack alignItems="center" gap={'$2'}>
      <Text font="headingBold" size="extra_large">
        {count}
      </Text>
      <Text font="headingLight" size="extra_small">
        {label}
      </Text>
    </YStack>
  );
};
