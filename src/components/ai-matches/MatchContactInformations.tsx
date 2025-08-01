import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from '../profile/ProfileItem';
import { TileHeader } from '../common/TileHeader';
import { MatchedUserProfile } from '@/src/models/Match';

type Props = {
  matchedUserProfile: MatchedUserProfile;
} & ViewProps;

export const MatchContactInformation = ({
  matchedUserProfile,
  ...props
}: Props) => {
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
      <TileHeader title="Contact Details" />
      <ProfileItem title="Email" subtitle={matchedUserProfile.email || 'N/A'} />
      <ProfileItem title="Phone" subtitle={matchedUserProfile.phone || 'N/A'} />
    </YStack>
  );
};
