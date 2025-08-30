import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import { YStack, View } from 'tamagui';
import BackIcon from '@/assets/images/icon-back.svg';
import { UpdateProfilePicture } from '@/components/profile/update/UpdateProfilePicture';
import { NameAndEmail } from '@/components/profile/NameAndEmail';
import { Formik } from 'formik';
import { UpdatePersonalInformation } from '@/components/profile/update/UpdatePersonalInformation';
import {
  toUpdateUserProfileFormType,
  toUpdateUserProfileRequest,
  UpdateUserProfileFormType,
} from '@/resources/form';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { updateUserProfileSchema } from '@/resources/validations/update-profile';
import { UpdateAboutYourSelf } from '@/components/profile/update/UpdateAboutSelf';
import { ProfileBackground } from '@/components/profile/ProfileBackground';
import { useEffect, useState } from 'react';
import { ImagePicker } from '@/components/common/ImagePicker';
import { useLoader } from '@/components/loader/LoaderContext';
import { useUserRepository } from '@/services/api/repositories/useUserRepository';
import { UpdateOtherInformation } from '@/components/profile/update/UpdateOtherInformation';
import { UpdateProfessionalInformation } from '@/components/profile/update/UpdateProfessionalInformation';
import { useAppSelector } from '@/services/store/hook';
import { router, useLocalSearchParams } from 'expo-router';
import { useStoreUser } from '@/hooks/useStoreUser';
import { useError } from '@/components/error/useError';

export default function UpdateProfile() {
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const { showLoader, hideLoader } = useLoader();
  const userRepository = useUserRepository();
  const { userProfile, email } = useAppSelector(state => state.user);
  const { purpose } = useLocalSearchParams<{
    purpose: string;
  }>();
  const { storeUserProfile } = useStoreUser();
  const { showError } = useError();

  useEffect(() => {
    if (userProfile.primaryPhotoUrl) {
      setPhotoUri(userProfile.primaryPhotoUrl);
    } else {
      setPhotoUri(
        `https://ui-avatars.com/api/?name=${userProfile.fullName}&size=512`,
      );
    }
  }, [userProfile.primaryPhotoUrl, userProfile.fullName]);

  const onBackPress = () => {
    router.back();
  };

  const initialValues: UpdateUserProfileFormType = toUpdateUserProfileFormType(
    userProfile,
  );

  const onUpdate = async (values: UpdateUserProfileFormType) => {
    console.log('Updated values:', values);
    showLoader();
    try {
      const response = await userRepository.updateProfile(
        toUpdateUserProfileRequest(values),
      );
      console.log('Profile updated successfully:', response);
      if (response.profile) {
        storeUserProfile(response.profile);
      }
      if (purpose === 'UPDATE') {
        router.back();
      } else {
        router.replace('/(app)/(onboarding)');
      }
    } catch (error: any) {
      showError({ description: error.message || 'Profile update failed' });
    }
    hideLoader();
  };

  const handleImageSelect = async (uri: string) => {
    setOpenImagePicker(false);
    setPhotoUri(uri);
    console.log('Selected image:', uri);
    try {
      const response = await userRepository.updateProfilePicture(uri);
      console.log('Profile picture updated successfully:', response);
      if (userProfile) {
        storeUserProfile({
          ...userProfile,
          primaryPhotoUrl: response,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <Screen theme="dark">
      <ProfileBackground uri={photoUri} />
      {purpose === 'UPDATE' && (
        <View
          marginTop={Platform.OS === 'android' ? '$4' : '$2'}
          paddingHorizontal={'$4'}
          paddingVertical={'$2'}
        >
          <TouchableOpacity onPress={onBackPress}>
            <BackIcon />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <UpdateProfilePicture
          uri={photoUri}
          onPress={() => {
            setOpenImagePicker(true);
          }}
        />
        <NameAndEmail fullName={userProfile.fullName} email={email} marginTop={'$1'} />
        <Formik<UpdateUserProfileFormType>
          initialValues={initialValues}
          validationSchema={updateUserProfileSchema}
          onSubmit={onUpdate}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <YStack marginTop={'$4.5'} width="100%" marginBottom={'$10'}>
              <YStack gap={'$3'}>
                <UpdatePersonalInformation />
                <UpdateOtherInformation />
                <UpdateProfessionalInformation />
                <UpdateAboutYourSelf />
              </YStack>

              <PrimaryButton
                title="Save"
                onPress={() => handleSubmit()}
                marginTop="$9"
                disabled={isSubmitting || !isValid}
              />
            </YStack>
          )}
        </Formik>
      </ScrollView>

      <ImagePicker
        open={openImagePicker}
        onOpenChange={setOpenImagePicker}
        onSelectImage={handleImageSelect}
        onError={error => console.error('Image Picker Error:', error)}
      />
    </Screen>
  );
}
