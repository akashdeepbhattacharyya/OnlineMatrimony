import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { YStack } from 'tamagui';
import { PersonalPreferences } from '@/src/components/settings/partner-preference/PersonalPreferences';
import {
  PartnerPreferenceFormType,
  toPartnerPreferenceFormType,
  toPartnerPreferencesRequest,
} from '@/src/resources/form';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { partnerPreferenceSchema } from '@/src/resources/validations/partner-preference';
import { OtherPreferences } from '@/src/components/settings/partner-preference/OtherPreferences';
import { ProfessionalPreferences } from '@/src/components/settings/partner-preference/ProfessionalPreferences';
import { useUserRepository } from '@/src/api/repositories/useUserRepository';
import { useLoader } from '@/src/context/LoaderContext';
import { RootStackParamList } from '@/src/navigation/RootNavigator';

import { useAppSelector, useAppDispatch } from '@/src/services/store/hook';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import { fetchPartnerPreferences } from '@/src/services/slices/partner-preferences';
import { useAuth } from '@/src/context/AuthContext';

type Props = {
  route: RouteProp<RootStackParamList, 'PartnerPreference'>;
};

export default function PartnerPreferenceScreen({
  route: {
    params: {
      data: { purpose },
    },
  },
}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userData } = useAppSelector(state => state.user);
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();
  const userRepository = useUserRepository();
  const { saveUser } = useAuth();

  useEffect(() => {
    showLoader();
    dispatch(
      fetchPartnerPreferences({
        getPartnerPreferences: userRepository.getPartnerPreferences,
      }),
    );
    hideLoader();
  }, []);

  console.log('Partner preferences fetched:', userData.preference);

  const initialValues: PartnerPreferenceFormType = toPartnerPreferenceFormType(
    userData.preference,
  );

  console.log('Initial values for partner preferences:', initialValues);

  const onConfirm = async (values: PartnerPreferenceFormType) => {
    console.log('Updated values:', values);
    const request = toPartnerPreferencesRequest(values);
    console.log('Request to update partner preferences:', request);
    showLoader();
    try {
      const response = await userRepository.updatePartnerPreferences(request);
      console.log('Partner preferences updated successfully:', response);
      saveUser(response);
      hideLoader();
      if (purpose === 'UPDATE') {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating partner preferences:', error);
      hideLoader();
    }
  };

  return (
    <Screen>
      <ScreenHeader
        headerText="Partner Preferences"
        screenType={purpose === 'ONBOARDING' ? 'onboarding' : 'default'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Formik<PartnerPreferenceFormType>
          initialValues={initialValues}
          validationSchema={partnerPreferenceSchema}
          onSubmit={onConfirm}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <YStack
              marginTop={'$2'}
              paddingHorizontal={'$4'}
              paddingVertical={'$2'}
              justifyContent="space-between"
              marginBottom={'$6'}
            >
              <YStack gap={'$4'}>
                <PersonalPreferences />
                <OtherPreferences />
                <ProfessionalPreferences />
              </YStack>
              <PrimaryButton
                title="Confirm"
                onPress={() => handleSubmit()}
                marginTop="$9"
                disabled={isSubmitting || !isValid}
                showArrow={false}
              />
            </YStack>
          )}
        </Formik>
      </ScrollView>
    </Screen>
  );
}
