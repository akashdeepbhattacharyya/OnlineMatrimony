import { YStack, ViewProps } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { TileHeader } from '../../common/TileHeader';
import { MatchedUserProfile } from '@/src/models/Match';
import { UserProfile } from '@/src/models/User';
import { diets } from '@/src/resources/diet';
import { useCommonInterest } from '@/src/hooks/useCommonInterest';
import { cities } from '@/src/resources/city-state';
import { motherTongues } from '@/src/resources/mother-tongue';
import { educations } from '@/src/resources/education';
import { occupations } from '@/src/resources/occupation';

type Props = {
  matchedUserProfile: MatchedUserProfile;
  currentUserProfile: UserProfile;
} & ViewProps;

export const MatchCommonBetween = ({
  matchedUserProfile,
  currentUserProfile,
  ...props
}: Props) => {
  const commonInterest = useCommonInterest(
    matchedUserProfile,
    currentUserProfile,
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
      <TileHeader title={`Common Between The Both Of You`} />
      {commonInterest.diet && (
        <Text font="heading" size="normal">
          {`You both enjoy ${diets[commonInterest.diet]} food.`}
        </Text>
      )}
      {commonInterest.city && (
        <Text font="heading" size="normal">
          {`You both lives in ${cities[commonInterest.city]}.`}
        </Text>
      )}
      {commonInterest.motherTongue && (
        <Text font="heading" size="normal">
          {`You both are from ${
            motherTongues[commonInterest.motherTongue]
          } community.`}
        </Text>
      )}
      {commonInterest.education && (
        <Text font="heading" size="normal">
          {`You both have ${educations[commonInterest.education]} degree.`}
        </Text>
      )}
      {commonInterest.occupation && (
        <Text font="heading" size="normal">
          {`You both work as ${occupations[commonInterest.occupation]}.`}
        </Text>
      )}
    </YStack>
  );
};
