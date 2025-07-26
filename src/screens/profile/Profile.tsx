import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Image, View, getToken, XStack } from 'tamagui';
import { dummyUserProfileWithPicture } from '@/src/models/User';
import { ProfilePicture } from '@/src/components/profile/ProfilePicture';
import { ConnectionsInformation } from '@/src/components/profile/ConnectionsInformation';
import { PersonalInformation } from '@/src/components/profile/PersonalInformation';
import { OtherInformation } from '@/src/components/profile/OtherInformation';
import { Documents } from '@/src/components/profile/Documents';
import { ProfessionalInformation } from '@/src/components/profile/ProfessionalInformation';
import { AboutYourSelf } from '@/src/components/profile/AboutYourSelf';
import { LinearGradient } from 'expo-linear-gradient';
import BackIcon from '@/assets/images/icon-back.svg';
import EditIcon from '@/assets/images/edit.svg';
import SettingsIcon from '@/assets/images/settings.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NameAndEmail } from '@/src/components/profile/NameAndEmail';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector, useTokenCallBack } from '@/src/store/hook';
import { accountStateItem, fetchUserProfile } from '@/src/slices/userSlice';
import { Formik } from 'formik';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { CheckBoxButton } from '@/src/components/common/CheckBoxButton';
import { Text } from '@/src/components/common/Text';
import { UserRegistrationFormType } from '@/src/resources/form';
import { updateProfile } from '@/src/api/UserService';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { useLoader } from '@/src/context/LoaderContext';

export default function Profile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { UserProfile } = useAppSelector(accountStateItem);
  const { showLoader, hideLoader } = useLoader();

  const [initialValues, setInitialValues] = useState<UserRegistrationFormType>({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    country: '',
    aboutMe: '',
    terms: false,
  });
  const dispatch = useAppDispatch();

  const onBackPress = () => {
    navigation.goBack();
  };
  useEffect(() => {
    showLoader();
    dispatch(fetchUserProfile({}));
    hideLoader();
  }, [])
  const userData = useMemo(() => {
    if (UserProfile && UserProfile.profile) {
      setInitialValues({
        fullName: UserProfile.profile.fullName,
        age: UserProfile.profile.age,
        email: UserProfile.email,
        phone: UserProfile.phone,
        dateOfBirth: UserProfile.profile.dateOfBirth,
        gender: UserProfile.profile.gender,
        address: UserProfile.profile.address,
        city: UserProfile.profile.city,
        country: UserProfile.profile.country,
        aboutMe: UserProfile.profile.aboutMe,
        terms: UserProfile.profile.terms,
      })
    }
    if (!!!UserProfile.profile.profilePicture) {
      return {
        ...UserProfile,
        profile: { ...UserProfile.profile, profilePicture: { uri: `https://ui-avatars.com/api/?name=${UserProfile.profile.fullName}` } },
      };
    }

    return {
      ...UserProfile,
    };
  }, [UserProfile])

  // const initialValues = ;

  const handleSubmitForm = async (values: UserRegistrationFormType) => {
    showLoader();
    await updateProfile(values);
    hideLoader();
    setIsEdit(false);
  };
  const handelSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <Screen theme="dark">
      <Image
        source={userData?.profile?.profilePicture}
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
        <XStack justifyContent="space-between" alignItems="center">
          {/* Left - Back Icon */}
          <TouchableOpacity onPress={onBackPress}>
            <BackIcon />
          </TouchableOpacity>

          {/* Right - Edit + Settings Icons */}
          <XStack gap="$3">
            {!isEdit && <TouchableOpacity onPress={() => setIsEdit(true)}>
              <EditIcon />
            </TouchableOpacity>}
            <TouchableOpacity onPress={handelSettings}>
              <SettingsIcon />
            </TouchableOpacity>
          </XStack>
        </XStack>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfilePicture
          isEdit={isEdit}
          profilePicture={userData?.profile?.profilePicture}
          marginTop={'$5'}
        />

        <NameAndEmail userProfile={userData} marginTop={'$3'} />
        {userData.acceptedCount || userData.receivedCount || userData.sentCount &&
          <ConnectionsInformation
            userProfile={userData}
            marginTop={'$3'}
          />
        }
        <YStack
          gap={'$3'}
          width={'100%'}
          marginTop={'$4.5'}
          marginBottom={'$5'}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
          >
            {({ values, handleSubmit, setFieldValue, isSubmitting, isValid, touched, errors, handleChange, handleBlur }) => (
              <>
                <PersonalInformation userProfile={userData} isEdit={isEdit} values={values} setFieldValue={setFieldValue} touched={touched} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                {/* <OtherInformation userProfile={dummyUserProfileWithPicture} />
                <Documents userProfile={dummyUserProfileWithPicture} />
                <ProfessionalInformation userProfile={dummyUserProfileWithPicture} /> */}
                <AboutYourSelf userProfile={userData} isEdit={isEdit} values={values} setFieldValue={setFieldValue} touched={touched} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                {isEdit && (
                  <>
                    <YStack gap={'$2'}>
                      <CheckBoxButton
                        option={{
                          label:
                            'I Accept all Terms and Conditions and Privacy Policy',
                          value: '',
                        }}
                        selected={values.terms}
                        onChange={() => setFieldValue('terms', !values.terms)}
                      />
                      {touched.terms && errors.terms && (
                        <Text theme={'error_message'}>{errors.terms}</Text>
                      )}
                    </YStack>
                    <PrimaryButton
                      title="Continue"
                      onPress={() => handleSubmit()}
                      marginTop="$2"
                      disabled={!isValid}
                    />

                  </>
                )}


              </>

            )}
          </Formik>

        </YStack>
      </ScrollView>
    </Screen>
  );
}
