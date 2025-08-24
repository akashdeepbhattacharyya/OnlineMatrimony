import { UserProfile } from '@/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { TileHeader } from '../common/TileHeader';
import { occupations } from '@/resources/occupation';
import { educations } from '@/resources/education';
import { formatAnnualIncome } from '@/utils/utils';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const ProfessionalInformation = ({ userProfile, ...props }: Props) => {
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
      <TileHeader title="Professional Information" />
      <ProfileItem
        title="Highest Education"
        subtitle={
          educations[userProfile.education as keyof typeof educations] || 'N/A'
        }
      />
      <ProfileItem
        title="Occupation"
        subtitle={
          occupations[userProfile.occupation as keyof typeof occupations] ||
          'N/A'
        }
      />
      <ProfileItem
        title="Annual Income"
        subtitle={formatAnnualIncome(Number(userProfile.annualIncome || 0))}
      />
    </YStack>
  );
};
