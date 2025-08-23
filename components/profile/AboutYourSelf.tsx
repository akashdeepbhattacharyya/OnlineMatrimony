import { UserProfile } from '@/models/User';
import { YStack, ViewProps } from 'tamagui';
import { Text } from '@/components/common/Text';
import { TileHeader } from '../common/TileHeader';

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
      <TileHeader title="About Yourself" />
      <Text font="heading" size="normal">
        {userProfile.aboutMe || 'No information provided.'}
      </Text>
    </YStack>
  );
};
