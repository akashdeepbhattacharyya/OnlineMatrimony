import { YStack, ViewProps, XStack, View, Image, getToken } from 'tamagui';
import { TileHeader } from '../../common/TileHeader';
import { Match } from '@/models/Match';
import { Text } from '../../common/Text';
import { UserProfile } from '@/models/User';
import MatchBlob from '@/assets/images/match.svg';
import { formatAnnualIncome, toFeetAndInches, toUri } from '@/utils/utils';
import { useAppSelector } from '@/services/store/hook';
import { ProfileItem } from '../../profile/ProfileItem';
import { diets } from '@/resources/diet';
import { religions } from '@/resources/religion';
import { motherTongues } from '@/resources/mother-tongue';
import { castes } from '@/resources/caste';
import { educations } from '@/resources/education';
import { occupations } from '@/resources/occupation';
import { cities } from '@/resources/city-state';

type Props = {
  match: Match;
  currentUserProfile: UserProfile;
} & ViewProps;

export const MatchPreferences = ({
  match,
  currentUserProfile,
  ...props
}: Props) => {
  const { partnerPreferences } = useAppSelector(
    state => state.partnerPreferences,
  );

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
      <View
        alignItems="center"
        padding="$4.5"
        backgroundColor={getToken('$color.button_bg_red')}
        borderRadius="$8"
      >
        <YStack gap={'$2'} alignItems="center">
          <Text font="headingBold" size="normal">
            {`You And ${
              match.profileResponse.gender === 'FEMALE' ? 'Her' : 'Him'
            }`}
          </Text>
          <View alignItems="center" justifyContent="center" height={94}>
            <XStack gap={'$4'} position="absolute">
              <Image
                source={{
                  uri: toUri(
                    currentUserProfile.fullName,
                    currentUserProfile.primaryPhotoUrl,
                  ),
                }}
                style={{ width: 94, height: 94, borderRadius: 47 }}
              />
              <Image
                source={{
                  uri: toUri(
                    match.profileResponse.fullName,
                    match.profileResponse.primaryPhotoUrl,
                  ),
                }}
                style={{ width: 94, height: 94, borderRadius: 47 }}
              />
            </XStack>
            <MatchBlob />
          </View>
        </YStack>
      </View>
      <TileHeader
        title={`You Match ${match.matchScore / 10}/10 Of ${
          match.profileResponse.gender === 'FEMALE' ? 'Her' : 'Him'
        } Preferences`}
      />
      <YStack gap={'$2.5'}>
        <ProfileItem
          title="Age"
          subtitle={`${partnerPreferences?.minAge} To ${partnerPreferences?.maxAge}`}
        />
        <ProfileItem
          title="Height"
          subtitle={`${toFeetAndInches(
            partnerPreferences?.minHeight,
          )} To ${toFeetAndInches(partnerPreferences?.maxHeight)}`}
        />
        <ProfileItem
          title="City Living In"
          subtitle={cities[match.profileResponse.city as keyof typeof cities]}
        />
        <ProfileItem
          title="Diet"
          subtitle={
            diets[match.profileResponse.diet as keyof typeof diets] || 'N/A'
          }
        />
        <ProfileItem
          title="Religion"
          subtitle={
            religions[
              match.profileResponse.religion as keyof typeof religions
            ] || 'N/A'
          }
        />
        <ProfileItem
          title="Caste"
          subtitle={
            castes[match.profileResponse.caste as keyof typeof castes] || 'N/A'
          }
        />
        <ProfileItem
          title="Mother Tongue"
          subtitle={
            motherTongues[
              match.profileResponse.motherTongue as keyof typeof motherTongues
            ] || 'N/A'
          }
        />
        <ProfileItem
          title="Highest Education"
          subtitle={
            educations[
              match.profileResponse.education as keyof typeof educations
            ] || 'N/A'
          }
        />
        <ProfileItem
          title="Occupation"
          subtitle={
            occupations[
              match.profileResponse.occupation as keyof typeof occupations
            ] || 'N/A'
          }
        />
        <ProfileItem
          title="Annual Income"
          subtitle={`Above INR ${formatAnnualIncome(
            Number(match.profileResponse.annualIncome || 0),
          )}`}
        />
      </YStack>
    </YStack>
  );
};
