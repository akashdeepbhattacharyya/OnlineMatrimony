import { ScrollView, YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ProfilePicture } from '@/components/user-profile/ProfilePicture';
import { AboutSelf } from '@/components/user-profile/AboutSelf';
import { PersonalInformation } from '@/components/user-profile/PersonalInformation';
import { useAppSelector } from '@/services/store/hook';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { useLocalSearchParams } from 'expo-router';

export default function SentMatchDetails() {
  const { sentMatches } = useAppSelector(state => state.match);
  const { matchId } = useLocalSearchParams<{
    matchId: string;
  }>();

  const userDetails = sentMatches.find(item => item.matchId === matchId);

  return (
    <Screen>
      <ScreenHeader headerText={userDetails?.profile.fullName} />
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
              <ProfilePicture userProfile={userDetails.profile} />
              <AboutSelf userProfile={userDetails.profile} />
              <PersonalInformation
                userProfile={userDetails.profile}
              />
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
