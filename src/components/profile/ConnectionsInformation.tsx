import { ViewProps, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { UserProfile } from '@/src/models/User';
import { User } from '@/src/models/Authentication';

type Props = {
  userProfile: User;
} & ViewProps;

export const ConnectionsInformation = ({ userProfile, ...props }: Props) => {
  return (
    <YStack gap={'$4'} {...props}>
      <XStack gap={'$10'} justifyContent="center">
        <ConnectionsRow
          count={userProfile.acceptedCount}
          label="Accepted"
        />
        <ConnectionsRow
          count={userProfile.receivedCount}
          label="Received"
        />
        <ConnectionsRow count={userProfile.sentCount} label="Sent" />
      </XStack>
    </YStack>
  );
};

const ConnectionsRow = ({
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
