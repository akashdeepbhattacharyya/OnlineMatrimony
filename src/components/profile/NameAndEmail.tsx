import { ViewProps, YStack } from 'tamagui';
import { User } from '@/src/models/User';
import { Text } from '@/src/components/common/Text';

type Props = {
  userData: User;
} & ViewProps;

export const NameAndEmail = ({ userData, ...props }: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <Text font="heading" size="large" marginTop="$3">
        {userData.profile.fullName}
      </Text>
      <Text font="headingLight" size="small" marginTop="$1">
        {userData.email}
      </Text>
    </YStack>
  );
};
