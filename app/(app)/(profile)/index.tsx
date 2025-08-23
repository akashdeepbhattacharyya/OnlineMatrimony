import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import { YStack, XStack } from 'tamagui';
import { ProfilePicture } from '@/components/profile/ProfilePicture';
import { ConnectionsInformation } from '@/components/profile/ConnectionsInformation';
import { PersonalInformation } from '@/components/profile/PersonalInformation';
import { OtherInformation } from '@/components/profile/OtherInformation';
import { Documents } from '@/components/profile/Documents';
import { ProfessionalInformation } from '@/components/profile/ProfessionalInformation';
import { AboutYourSelf } from '@/components/profile/AboutYourSelf';
import BackIcon from '@/assets/images/icon-back.svg';
import EditIcon from '@/assets/images/icon-edit.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NameAndEmail } from '@/components/profile/NameAndEmail';
import { ProfileBackground } from '@/components/profile/ProfileBackground';
import { useLoader } from '@/context/LoaderContext';
import {
  accountStateItem,
  fetchUserProfile,
} from '@/services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { useEffect, useMemo } from 'react';
import { useUserRepository } from '@/services/api/repositories/useUserRepository';
import { router } from 'expo-router';

export default function Profile() {
  const { userData } = useAppSelector(accountStateItem);
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();
  const userRepository = useUserRepository();

  const profilePictureUri = useMemo(() => {
    return userData.profile.primaryPhotoUrl
      ? userData.profile.primaryPhotoUrl
      : `https://ui-avatars.com/api/?name=${userData.profile.fullName}&size=512`;
  }, [userData.profile.primaryPhotoUrl, userData.profile.fullName]);

  const onBackPress = () => {
    router.back();
  };

  const onEditPress = () => {
    router.push({
      pathname: 'UpdateProfile',
      params: {
        purpose: 'UPDATE',
      },
    });
  };

  useEffect(() => {
    showLoader();
    dispatch(fetchUserProfile({ getProfile: userRepository.getProfile }));
    hideLoader();
  }, []);

  return (
    <Screen theme="dark">
      <ProfileBackground uri={profilePictureUri} />
      <XStack
        marginTop={Platform.OS === 'android' ? '$4' : '$2'}
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
        <ProfilePicture uri={profilePictureUri} marginTop={'$5'} />
        <NameAndEmail userData={userData} marginTop={'$3'} />
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
          <PersonalInformation userData={userData} />
          <OtherInformation userProfile={userData.profile} />
          {/* <Documents userProfile={userData.profile} /> */}
          <ProfessionalInformation userProfile={userData.profile} />
          <AboutYourSelf userProfile={userData.profile} />
        </YStack>
      </ScrollView>
    </Screen>
  );
}
