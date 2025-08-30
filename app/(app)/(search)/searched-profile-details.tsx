import { ScrollView, YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ProfilePicture } from '@/components/user-profile/ProfilePicture';
import { AboutSelf } from '@/components/user-profile/AboutSelf';
import { PersonalInformation } from '@/components/user-profile/PersonalInformation';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { router, useLocalSearchParams } from 'expo-router';
import { MatchCommonBetween } from '@/components/matches/match-details/MatchCommonBetween';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { SentMatch } from '@/models/Match';
import { setSentMatches, setBestMatches } from '@/services/slices/match-slice';
import { ManageMatch } from '@/components/matches/ManageMatch';

export default function SearchedProfileDetails() {
  const { userSearchData } = useAppSelector(state => state.search);
  const { userId } = useLocalSearchParams<{
    userId: string;
  }>();
  const { sendRequest } = useUserMatch();
  const dispatch = useAppDispatch();
  const { sentMatches, bestMatches } = useAppSelector(state => state.match);
  const { userProfile } = useAppSelector(state => state.user);

  const userDetails = userSearchData.find(item => String(item.userId) === userId);

  const handleSendRequest = async () => {
    if (userDetails) {
      console.log('Sending match:', userDetails.userId);
      await sendRequest(userDetails.userId);
      // Refresh sent matches after sending
      const sentMatch: SentMatch = { matchId: "", profile: userDetails };
      const matches = [
        ...sentMatches,
        sentMatch
      ]
      dispatch(setSentMatches(matches));

      // Remove from best matches
      const filteredMatches = bestMatches.filter(item => item.profileResponse.userId !== userDetails.userId);
      dispatch(setBestMatches(filteredMatches));

      router.back();
    } else {
      console.log('No match to accept');
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText={userDetails?.fullName} />
      <ManageMatch
        hideRejectButton
        onAccept={handleSendRequest}
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
          {userDetails && (
            <YStack key={0} gap={'$4'}>
              <ProfilePicture userProfile={userDetails} />
              <AboutSelf userProfile={userDetails} />
              <PersonalInformation
                userProfile={userDetails}
              />
              <MatchCommonBetween
                matchedUserProfile={userDetails}
                currentUserProfile={userProfile}
              />
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
