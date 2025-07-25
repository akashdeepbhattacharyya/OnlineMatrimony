import { View, ViewProps, YStack } from 'tamagui';
import { UserProfile } from '@/src/models/User';
import { Text } from '@/src/components/common/Text';
import { User } from '@/src/models/Authentication';

type Props = {
  userProfile: User;
} & ViewProps;

export const NameAndEmail = ({ userProfile, ...props }: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <Text font="heading" size="large" marginTop="$3">
        {userProfile.profile.fullName}
      </Text>
      <Text font="headingLight" size="small" marginTop="$1">
        {userProfile.email}
      </Text>
    </YStack>
  );
};
