import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
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
import {
  accountStateItem,
  fetchUserProfile,
} from '@/src/services/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/src/services/store/hook';
import { useEffect, useMemo } from 'react';
import { useUserRepository } from '@/src/api/repositories/useUserRepository';

export default function Profile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
    navigation.goBack();
  };

  const onEditPress = () => {
    navigation.navigate('UpdateProfile', {
      data: {
        userData,
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
          {/* <OtherInformation userData={userData} />
          <Documents userData={userData} />
          <ProfessionalInformation userData={userData} /> */}
          <AboutYourSelf userProfile={userData.profile} />
        </YStack>
      </ScrollView>
    </Screen>
  );
}
