import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { TileHeader } from '../common/ProfileTileHeader';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const Documents = ({ userProfile, ...props }: Props) => {
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
      <TileHeader title="Documents" />
      <ProfileItem title="ID Proof" subtitle={userProfile.idProof} />
      <ProfileItem title="Address Proof" subtitle={userProfile.addressProof} />
    </YStack>
  );
};
