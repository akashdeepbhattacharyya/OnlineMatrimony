import { UserProfile } from '@/src/models/User';
import { YStack, XStack, getToken, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { Text } from '@/src/components/common/Text';
import DottedDivider from '@/assets/images/dotted-divider.svg';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const AboutYourSelf = ({ userProfile, ...props }: Props) => {
  return (
    <YStack
      theme={'profile_tile'}
      width={'100%'}
      gap={'$4'}
      backgroundColor={'$background'}
      padding="$4"
      borderRadius="$8"
      {...props}
    >
      <Text font="heading" size="normal">
        {`About Yourself`}
      </Text>
      <DottedDivider width={'100%'} />
      <Text font="heading" size="normal">
        {userProfile.aboutSelf}
      </Text>
    </YStack>
  );
};
