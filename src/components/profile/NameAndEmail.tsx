import { View, ViewProps, YStack } from 'tamagui';
import { UserProfile } from '@/src/models/User';
import { Text } from '@/src/components/common/Text';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const NameAndEmail = ({ userProfile, ...props }: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <Text font="heading" size="large" marginTop="$3">
        {userProfile.personalInformation.fullName}
      </Text>
      <Text font="headingLight" size="small" marginTop="$1">
        {userProfile.email}
      </Text>
    </YStack>
  );
};
