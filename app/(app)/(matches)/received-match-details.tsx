import { ScrollView, YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ProfilePicture } from '@/components/user-profile/ProfilePicture';
import { AboutSelf } from '@/components/user-profile/AboutSelf';
import { PersonalInformation } from '@/components/user-profile/PersonalInformation';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { router, useLocalSearchParams } from 'expo-router';
import { ManageMatch } from '@/components/matches/ManageMatch';
import { MutualMatch } from '@/models/Match';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { setReceivedMatches, setMutualMatches } from '@/services/slices/match-slice';

export default function ReceivedMatchDetails() {
  const { receivedMatches, mutualMatches } = useAppSelector(state => state.match);
  const { matchId } = useLocalSearchParams<{
    matchId: string;
  }>();
  const { acceptOrRejectMatch } = useUserMatch();
  const dispatch = useAppDispatch();

  const match = receivedMatches.find(item => item.matchId === matchId);

  const handleAcceptMatch = async () => {
    if (match) {
      await acceptOrRejectMatch(match.matchId, 'ACCEPT');
      // Refresh received matches after accepting
      const filteredMatches = receivedMatches.filter(item => item.matchId !== matchId);
      dispatch(setReceivedMatches(filteredMatches));

      // Add to mutual matches
      const newMutualMatches: MutualMatch[] = [...mutualMatches, {
        ...match.profile,
      }];
      dispatch(setMutualMatches(newMutualMatches));
      router.back();
    } else {
      console.error('No match to accept');
    }
  };

  const handleRejectMatch = async () => {
    if (match) {
      await acceptOrRejectMatch(match.matchId, 'REJECT');
      // Refresh received matches after rejecting
      const filteredMatches = receivedMatches.filter(item => item.matchId !== matchId);
      dispatch(setReceivedMatches(filteredMatches));
      router.back();
    } else {
      console.error('No match to reject');
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText={match?.profile.fullName} />
      <ManageMatch
        onAccept={handleAcceptMatch}
        onReject={handleRejectMatch}
        position="absolute"
        bottom={'$0'}
      />
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
              <ProfilePicture userProfile={match.profile} />
              <AboutSelf userProfile={match.profile} />
              <PersonalInformation
                userProfile={match.profile}
              />
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
