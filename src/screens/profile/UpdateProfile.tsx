import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import {
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { YStack, View } from 'tamagui';
import BackIcon from '@/assets/images/icon-back.svg';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { UpdateProfilePicture } from '@/src/components/profile/update/UpdateProfilePicture';
import { NameAndEmail } from '@/src/components/profile/NameAndEmail';
import { Formik } from 'formik';
import { UpdatePersonalInformation } from '@/src/components/profile/update/UpdatePersonalInformation';
import { UpdateUserProfileFormType } from '@/src/resources/form';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { formatDate } from '@/src/utils/dateFormatter';
import { updateUserProfileSchema } from '@/src/resources/validations/update-profile';
import { UpdateAboutYourSelf } from '@/src/components/profile/update/UpdateAboutSelf';
import { ProfileBackground } from '@/src/components/profile/ProfileBackground';
import { useEffect, useState } from 'react';
import { ImagePicker } from '@/src/components/common/ImagePicker';
import { userRepository } from '@/src/api';
import { useLoader } from '@/src/context/LoaderContext';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { convertToPayload } from '@/src/utils/utils';

type Props = {
  route: RouteProp<RootStackParamList, 'UpdateProfile'>;
};

export default function UpdateProfile({
  route: {
    params: { data: userData },
  },
}: Props) {
  const navigation = useNavigation();
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (userData.profile.primaryPhotoUrl) {
      setPhotoUri(userData.profile.primaryPhotoUrl);
    }
  }, [userData.profile.primaryPhotoUrl]);

  const onBackPress = () => {
    navigation.goBack();
  };

  const initialValues: UpdateUserProfileFormType = {
    fullName: userData.profile.fullName,
    // dateOfBirth: formatDate(
    //   userData.profile.dateOfBirth,
    //   'yyyy-MM-dd',
    //   'dd/MM/yyyy',
    // ),
    dateOfBirth: '',
    gender: userData.profile.gender,
    city: userData.profile.city,
    state: userData.profile.state,
    pincode: userData.profile.pincode,
    aboutMe: userData.profile.aboutMe,
  };

  const onUpdate = async (values: UpdateUserProfileFormType) => {
    console.log('Updated values:', values);
    showLoader();
    await userRepository.updateProfile(convertToPayload(values));
    hideLoader();
  };

  const handleImageSelect = async (uri: string) => {
    setOpenImagePicker(false);
    setPhotoUri(uri);
    console.log('Selected image:', uri);
    try {
      await userRepository.updateProfilePicture(uri);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <Screen theme="dark">
      <ProfileBackground userData={userData} />
      <View marginTop={'$10'} paddingHorizontal={'$4'} paddingVertical={'$2'}>
        <TouchableOpacity onPress={onBackPress}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <UpdateProfilePicture
          userData={userData}
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
