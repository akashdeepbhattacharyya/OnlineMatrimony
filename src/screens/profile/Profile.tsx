import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { ScrollView } from 'react-native';
import { YStack } from 'tamagui';
import { dummyUserProfileWithPicture } from '@/src/models/User';
import { ProfilePicture } from '@/src/components/profile/ProfilePicture';
import { BasicInformation } from '@/src/components/profile/BasicInformation';
import { PersonalInformation } from '@/src/components/profile/PersonalInformation';
import { OtherInformation } from '@/src/components/profile/OtherInformation';
import { Documents } from '@/src/components/profile/Documents';
import { ProfessionalInformation } from '@/src/components/profile/ProfessionalInformation';
import { AboutYourSelf } from '@/src/components/profile/AboutYourSelf';

export default function Profile() {
  return (
    <Screen theme="dark">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfilePicture
          profilePicture={dummyUserProfileWithPicture.profilePicture}
          marginTop={'$10'}
        />
        <BasicInformation
          userProfile={dummyUserProfileWithPicture}
          marginTop={'$3'}
        />
        <YStack
          gap={'$3'}
          width={'100%'}
          marginTop={'$4.5'}
          marginBottom={'$5'}
        >
          <PersonalInformation userProfile={dummyUserProfileWithPicture} />
          <OtherInformation userProfile={dummyUserProfileWithPicture} />
          <Documents userProfile={dummyUserProfileWithPicture} />
          <ProfessionalInformation userProfile={dummyUserProfileWithPicture} />
          <AboutYourSelf userProfile={dummyUserProfileWithPicture} />
        </YStack>
      </ScrollView>
    </Screen>
  );
}
