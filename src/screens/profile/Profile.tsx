import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, XStack } from 'tamagui';
import { ProfilePicture } from '@/src/components/profile/ProfilePicture';
import { ConnectionsInformation } from '@/src/components/profile/ConnectionsInformation';
import { PersonalInformation } from '@/src/components/profile/PersonalInformation';
import { OtherInformation } from '@/src/components/profile/OtherInformation';
import { Documents } from '@/src/components/profile/Documents';
import { ProfessionalInformation } from '@/src/components/profile/ProfessionalInformation';
import { AboutYourSelf } from '@/src/components/profile/AboutYourSelf';
import BackIcon from '@/assets/images/icon-back.svg';
import EditIcon from '@/assets/images/icon-edit.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NameAndEmail } from '@/src/components/profile/NameAndEmail';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { ProfileBackground } from '@/src/components/profile/ProfileBackground';
import { useLoader } from '@/src/context/LoaderContext';
import { accountStateItem, fetchUserProfile } from '@/src/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hook';
import { useEffect, useMemo } from 'react';

export default function Profile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { UserProfile } = useAppSelector(accountStateItem);
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();

  const onBackPress = () => {
    navigation.goBack();
  };

  const onEditPress = () => {
    navigation.navigate('UpdateProfile', {
      data: UserProfile.profile,
    });
  };

  useEffect(() => {
    showLoader();
    dispatch(fetchUserProfile({}));
    hideLoader();
  }, []);
  const userData = useMemo(() => {
    console.log('UserProfile', UserProfile);
    // if (!!!UserProfile.profile.profilePicture) {
    //   return {
    //     ...UserProfile,
    //     profile: {
    //       ...UserProfile.profile,
    //       profilePicture: {
    //         uri: `https://ui-avatars.com/api/?name=${UserProfile.profile.fullName}`,
    //       },
    //     },
    //   };
    // }

    return {
      ...UserProfile,
    };
  }, [UserProfile]);

  return (
    <Screen theme="dark">
      <ProfileBackground image={userData.profile.profilePicture} />
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
          profilePicture={userData.profile.profilePicture}
          marginTop={'$5'}
        />
        <NameAndEmail userProfile={userData.profile} marginTop={'$3'} />
        <ConnectionsInformation
          userProfile={userData.profile}
          marginTop={'$3'}
        />
        <YStack
          gap={'$3'}
          width={'100%'}
          marginTop={'$4.5'}
          marginBottom={'$5'}
        >
          <PersonalInformation userProfile={userData.profile} />
          <OtherInformation userProfile={userData.profile} />
          <Documents userProfile={userData.profile} />
          <ProfessionalInformation userProfile={userData.profile} />
          <AboutYourSelf userProfile={userData.profile} />
        </YStack>
      </ScrollView>
    </Screen>
  );
}
