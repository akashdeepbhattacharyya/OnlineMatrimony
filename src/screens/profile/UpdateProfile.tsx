import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Image, View, getToken } from 'tamagui';
import { dummyUserProfileWithPicture } from '@/src/models/User';
import LinearGradient from 'react-native-linear-gradient';
import BackIcon from '@/assets/images/icon-back.svg';
import { useNavigation } from '@react-navigation/native';
import { UpdateProfilePicture } from '@/src/components/profile/update/UpdateProfilePicture';
import { NameAndEmail } from '@/src/components/profile/NameAndEmail';
import { Formik } from 'formik';
import { UpdatePersonalInformation } from '@/src/components/profile/update/UpdatePersonalInformation';
import { UpdateProfileFormType } from '@/src/resources/form';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { formatDate } from '@/src/utils/dateFormatter';
import { updateProfileSchema } from '@/src/resources/validations/update-profile';
import { UpdateAboutYourSelf } from '@/src/components/profile/update/UpdateAboutSelf';
import { ProfileBackground } from '@/src/components/profile/ProfileBackground';
import { useState } from 'react';
import { ImagePicker } from '@/src/components/common/ImagePicker';

export default function UpdateProfile() {
  const navigation = useNavigation();
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onBackPress = () => {
    navigation.goBack();
  };

  const initialValues: UpdateProfileFormType = {
    fullName: dummyUserProfileWithPicture.fullName,
    dateOfBirth: formatDate(
      dummyUserProfileWithPicture.dateOfBirth,
      'yyyy-MM-dd',
      'dd/MM/yyyy',
    ),
    gender: dummyUserProfileWithPicture.gender,
    city: dummyUserProfileWithPicture.city,
    state: dummyUserProfileWithPicture.state,
    pincode: dummyUserProfileWithPicture.pincode,
    aboutMe: dummyUserProfileWithPicture.aboutMe,
  };

  const onUpdate = async (values: UpdateProfileFormType) => {
    console.log('Updated values:', values);
  };

  const handleImageSelect = (uri: string) => {
    setSelectedImage(uri);
    setOpenImagePicker(false);
    console.log('Selected image:', uri);
  };

  return (
    <Screen theme="dark">
      <ProfileBackground
        image={
          selectedImage
            ? { uri: selectedImage }
            : require('@/assets/images/splashScreen.png')
        }
      />
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
          profilePicture={dummyUserProfileWithPicture.profilePicture}
          onPress={() => {
            setOpenImagePicker(true);
          }}
        />
        <NameAndEmail
          userProfile={dummyUserProfileWithPicture}
          marginTop={'$1'}
        />
        <Formik<UpdateProfileFormType>
          initialValues={initialValues}
          validationSchema={updateProfileSchema}
          onSubmit={onUpdate}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <YStack marginTop={'$4.5'} width="100%" marginBottom={'$10'}>
              <YStack gap={'$3'}>
                <UpdatePersonalInformation
                  userProfile={dummyUserProfileWithPicture}
                />
                <UpdateAboutYourSelf
                  userProfile={dummyUserProfileWithPicture}
                />
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
