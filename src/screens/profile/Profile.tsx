import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Image, View, getToken, XStack } from 'tamagui';
import { dummyUserProfileWithPicture } from '@/src/models/User';
import { ProfilePicture } from '@/src/components/profile/ProfilePicture';
import { ConnectionsInformation } from '@/src/components/profile/ConnectionsInformation';
import { PersonalInformation } from '@/src/components/profile/PersonalInformation';
import { OtherInformation } from '@/src/components/profile/OtherInformation';
import { Documents } from '@/src/components/profile/Documents';
import { ProfessionalInformation } from '@/src/components/profile/ProfessionalInformation';
import { AboutYourSelf } from '@/src/components/profile/AboutYourSelf';
import LinearGradient from 'react-native-linear-gradient';
import BackIcon from '@/assets/images/icon-back.svg';
import EditIcon from '@/assets/images/icon-edit.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NameAndEmail } from '@/src/components/profile/NameAndEmail';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { ProfileBackground } from '@/src/components/profile/ProfileBackground';

export default function Profile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onBackPress = () => {
    navigation.goBack();
  };

  const onEditPress = () => {
    navigation.navigate('UpdateProfile');
  };

  return (
    <Screen theme="dark">
      <ProfileBackground image={require('@/assets/images/splashScreen.png')} />
      <XStack
        marginTop={'$10'}
        paddingHorizontal={'$4'}
        paddingVertical={'$2'}
        justifyContent="space-between"
      >
        <TouchableOpacity onPress={onBackPress}>
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEditPress}>
          <EditIcon />
        </TouchableOpacity>
      </XStack>
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
          marginTop={'$5'}
        />
        <NameAndEmail
          userProfile={dummyUserProfileWithPicture}
          marginTop={'$3'}
        />
        <ConnectionsInformation
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
