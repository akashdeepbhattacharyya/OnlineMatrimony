import { ViewProps, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { UserProfile } from '@/models/User';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const ConnectionsInformation = ({ userProfile, ...props }: Props) => {
  return (
    <YStack gap={'$4'} {...props}>
      <XStack gap={'$10'} justifyContent="center">
        <ConnectionsRow
          count={700}
          label="Accepted"
        />
        <ConnectionsRow
          count={1000}
          label="Received"
        />
        <ConnectionsRow count={2000} label="Sent" />
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
