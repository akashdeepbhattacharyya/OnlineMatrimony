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

export default function UpdateProfile() {
  const navigation = useNavigation();

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

  const onUpdate = (values: UpdateProfileFormType) => {
    console.log('Updated values:', values);
  };

  return (
    <Screen theme="dark">
      <Image
        source={require('@/assets/images/splashScreen.png')}
        position="absolute"
        objectFit="cover"
      />
      <LinearGradient
        colors={[
          getToken('$color.primary'),
          getToken('$color.red_80'),
          getToken('$color.primary'),
        ]}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        locations={[0, 0.6, 1]}
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
          onPress={() => {}}
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
    </Screen>
  );
}
