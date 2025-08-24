import { ViewProps, YStack } from 'tamagui';
import { User } from '@/models/User';
import { Text } from '@/components/common/Text';

type Props = {
  fullName?: string;
  email?: string;
} & ViewProps;

export const NameAndEmail = ({ fullName, email, ...props }: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <Text font="heading" size="large" marginTop="$3">
        {fullName}
      </Text>
      <Text font="headingLight" size="small" marginTop="$1">
        {email}
      </Text>
    </YStack>
  );
};
