import { UserProfile } from '@/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { TileHeader } from '../common/TileHeader';
import { castes, subCastes } from '@/resources/caste';
import { diets } from '@/resources/diet';
import { maritalStatuses } from '@/resources/marital-status';
import { motherTongues } from '@/resources/mother-tongue';
import { religions } from '@/resources/religion';
import { toFeetAndInches } from '@/utils/utils';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const OtherInformation = ({ userProfile, ...props }: Props) => {
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
      <TileHeader title="Other Information" />
      <ProfileItem
        title="Diet"
        subtitle={diets[userProfile.diet as keyof typeof diets] || 'N/A'}
      />
      <ProfileItem
        title="Height"
        subtitle={toFeetAndInches(userProfile.height) || 'N/A'}
      />
      <ProfileItem title="Weight" subtitle={`${userProfile.weight || 0} kg`} />
      <ProfileItem
        title="Religion"
        subtitle={religions[userProfile.religion as keyof typeof religions] || 'N/A'}
      />
      <ProfileItem
        title="Caste"
        subtitle={castes[userProfile.caste as keyof typeof castes] || 'N/A'}
      />
      <ProfileItem
        title="Sub Caste"
        subtitle={subCastes[userProfile.subCaste as keyof typeof subCastes] || 'N/A'}
      />
      <ProfileItem
        title="Mother Tongue"
        subtitle={
          motherTongues[userProfile.motherTongue as keyof typeof motherTongues] || 'N/A'
        }
      />
      <ProfileItem
        title="Marital Status"
        subtitle={
          maritalStatuses[
          userProfile.maritalStatus as keyof typeof maritalStatuses
          ] || 'N/A'
        }
      />
    </YStack>
  );
};
