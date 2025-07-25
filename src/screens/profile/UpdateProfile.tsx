import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Image, View, getToken } from 'tamagui';
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
import { useNavigation } from '@react-navigation/native';
import { UpdateProfilePicture } from '@/src/components/profile/update/UpdateProfilePicture';
import { NameAndEmail } from '@/src/components/profile/NameAndEmail';
import { Form, Formik, useFormik } from 'formik';
import { UpdatePersonalInformation } from '@/src/components/profile/update/UpdatePersonalInformation';
import { UpdateProfileFormType } from '@/src/resources/form';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { formatDate } from '@/src/utils/dateFormatter';
import { updateProfileSchema } from '@/src/resources/validations/update-profile';

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

        {/* <ConnectionsInformation
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
          <AboutYourSelf userProfile={dummyUserProfileWithPicture} /> */}
        {/* </YStack> */}
      </ScrollView>
    </Screen>
  );
}
