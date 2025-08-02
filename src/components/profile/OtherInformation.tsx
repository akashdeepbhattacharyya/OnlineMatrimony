import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { TileHeader } from '../common/TileHeader';
import { castes } from '@/src/resources/caste';
import { diets } from '@/src/resources/diet';
import { educations } from '@/src/resources/education';
import { maritalStatuses } from '@/src/resources/marital-status';
import { motherTongues } from '@/src/resources/mother-tongue';
import { religions } from '@/src/resources/religion';

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
        subtitle={diets[userProfile.diet as keyof typeof diets]}
      />
      <ProfileItem title="Height" subtitle={userProfile.height} />
      <ProfileItem title="Weight" subtitle={userProfile.weight} />
      <ProfileItem
        title="Religion"
        subtitle={religions[userProfile.religion as keyof typeof religions]}
      />
      <ProfileItem
        title="Caste"
        subtitle={castes[userProfile.caste as keyof typeof castes]}
      />
      <ProfileItem
        title="Languages"
        subtitle={
          motherTongues[userProfile.motherTongue as keyof typeof motherTongues]
        }
      />
      <ProfileItem
        title="Marital Status"
        subtitle={
          maritalStatuses[userProfile.maritalStatus as keyof typeof maritalStatuses]
        }
      />
      <ProfileItem
        title="Highest Education"
        subtitle={educations[userProfile.education as keyof typeof educations]}
      />
    </YStack>
  );
};
