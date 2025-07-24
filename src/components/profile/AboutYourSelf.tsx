import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { ProfileTileHeader } from './ProfileTileHeader';

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
      <ProfileTileHeader title="About Yourself" />
      <Text font="heading" size="normal">
        {userProfile.aboutSelf}
      </Text>
    </YStack>
  );
};
