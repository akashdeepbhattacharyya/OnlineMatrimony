import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import { YStack, View } from 'tamagui';
import BackIcon from '@/assets/images/icon-back.svg';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { UpdateProfilePicture } from '@/src/components/profile/update/UpdateProfilePicture';
import { NameAndEmail } from '@/src/components/profile/NameAndEmail';
import { Formik } from 'formik';
import { UpdatePersonalInformation } from '@/src/components/profile/update/UpdatePersonalInformation';
import {
  toUpdateUserProfileFormType,
  toUpdateUserProfileRequest,
  UpdateUserProfileFormType,
} from '@/src/resources/form';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { updateUserProfileSchema } from '@/src/resources/validations/update-profile';
import { UpdateAboutYourSelf } from '@/src/components/profile/update/UpdateAboutSelf';
import { ProfileBackground } from '@/src/components/profile/ProfileBackground';
import { useEffect, useState } from 'react';
import { ImagePicker } from '@/src/components/common/ImagePicker';
import { useLoader } from '@/src/context/LoaderContext';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { useUserRepository } from '@/src/api/repositories/useUserRepository';
import { useAuth } from '@/src/context/AuthContext';
import { UpdateOtherInformation } from '@/src/components/profile/update/UpdateOtherInformation';
import { UpdateProfessionalInformation } from '@/src/components/profile/update/UpdateProfessionalInformation';

type Props = {
  route: RouteProp<RootStackParamList, 'UpdateProfile'>;
};

export default function UpdateProfile({
  route: {
    params: {
      data: { userData, purpose },
    },
  },
}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();;
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const { showLoader, hideLoader } = useLoader();
  const userRepository = useUserRepository();
  const { saveUser } = useAuth();

  useEffect(() => {
    if (userData.profile.primaryPhotoUrl) {
      setPhotoUri(userData.profile.primaryPhotoUrl);
    } else {
      setPhotoUri(
        `https://ui-avatars.com/api/?name=${userData.profile.fullName}&size=512`,
      );
    }
  }, [userData.profile.primaryPhotoUrl, userData.profile.fullName]);

  const onBackPress = () => {
    navigation.goBack();
  };

  const initialValues: UpdateUserProfileFormType = toUpdateUserProfileFormType(
    userData.profile,
  );

  const onUpdate = async (values: UpdateUserProfileFormType) => {
    console.log('Updated values:', values);
    showLoader();
    try {
      const response = await userRepository.updateProfile(
        toUpdateUserProfileRequest(values),
      );
      console.log('Profile updated successfully:', response);
      saveUser(response);
      if (purpose === 'UPDATE') {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
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
      saveUser({
        ...userData,
        profile: {
          ...userData.profile,
          primaryPhotoUrl: response,
        },
      });
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
        <NameAndEmail userData={userData} marginTop={'$1'} />
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
