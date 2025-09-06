import { ScrollView, YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ProfilePicture } from '@/components/user-profile/ProfilePicture';
import { AboutSelf } from '@/components/user-profile/AboutSelf';
import { PersonalInformation } from '@/components/user-profile/PersonalInformation';
import { useAppSelector } from '@/services/store/hook';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { useLocalSearchParams } from 'expo-router';
import { MatchCommonBetween } from '@/components/matches/match-details/MatchCommonBetween';

export default function MutualMatchProfileDetails() {
  const { userId } = useLocalSearchParams<{
    userId: string;
  }>();
  const { userProfile } = useAppSelector(state => state.user);
  const { mutualMatches } = useAppSelector(state => state.match);

  const match = mutualMatches.find(match => match.userId.toString() === userId);

  return (
    <Screen>
      <ScreenHeader headerText={match?.fullName} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1} marginBottom={'$11'} paddingHorizontal={'$4'}>
          {match && (
            <YStack key={0} gap={'$4'}>
              <ProfilePicture userProfile={match} />
              <AboutSelf userProfile={match} />
              <PersonalInformation
                userProfile={match}
              />
              <MatchCommonBetween
                matchedUserProfile={match}
                currentUserProfile={userProfile}
              />
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
