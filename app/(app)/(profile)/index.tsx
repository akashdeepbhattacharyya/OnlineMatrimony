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
import { NameAndEmail } from '@/components/profile/NameAndEmail';
import { ProfileBackground } from '@/components/profile/ProfileBackground';
import { useLoader } from '@/context/LoaderContext';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { useEffect, useMemo } from 'react';
import { useUserRepository } from '@/services/api/repositories/useUserRepository';
import { router } from 'expo-router';

export default function Profile() {
  const { email, phone, userProfile } = useAppSelector(state => state.user);
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();
  const userRepository = useUserRepository();

  const profilePictureUri = useMemo(() => {
    return userProfile.primaryPhotoUrl
      ? userProfile.primaryPhotoUrl
      : `https://ui-avatars.com/api/?name=${userProfile.fullName}&size=512`;
  }, [userProfile.primaryPhotoUrl, userProfile.fullName]);

  const onBackPress = () => {
    router.back();
  };

  const onEditPress = () => {
    router.push({
      pathname: '/(app)/(profile)/(update)',
      params: {
        purpose: 'UPDATE',
      },
    });
  };

  // useEffect(() => {
  //   showLoader();
  //   dispatch(fetchUserProfile({ getProfile: userRepository.getProfile }));
  //   hideLoader();
  // }, []);

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
        <NameAndEmail fullName={userProfile.fullName} email={email} marginTop={'$3'} />
        {/* <ConnectionsInformation
          userProfile={userProfile}
          marginTop={'$3'}
        /> */}
        <YStack
          gap={'$3'}
          width={'100%'}
          marginTop={'$4.5'}
          marginBottom={'$5'}
        >
          <PersonalInformation userProfile={userProfile} phone={phone} />
          <OtherInformation userProfile={userProfile} />
          {/* <Documents userProfile={userProfile} /> */}
          <ProfessionalInformation userProfile={userProfile} />
          <AboutYourSelf userProfile={userProfile} />
        </YStack>
      </ScrollView>
    </Screen>
  );
}
