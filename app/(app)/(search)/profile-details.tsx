import { ScrollView, YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ProfilePicture } from '@/components/user-profile/ProfilePicture';
import { AboutSelf } from '@/components/user-profile/AboutSelf';
import { PersonalInformation } from '@/components/user-profile/PersonalInformation';
import { useAppSelector } from '@/services/store/hook';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { useLocalSearchParams } from 'expo-router';

export default function SearchProfileDetails() {
  const { userSearchData } = useAppSelector(state => state.search);
  const { userId } = useLocalSearchParams<{
    userId: string;
  }>();

  const userDetails = userSearchData.find(item => String(item.id) === userId);

  return (
    <Screen>
      <ScreenHeader headerText={userDetails?.fullName} />
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
              {/* <MatchPreferences
                match={userDetails}
                currentUserProfile={userProfile}
              />
              <MatchCommonBetween
                matchedUserProfile={userDetails.profileResponse}
                currentUserProfile={userProfile}
              /> */}
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
