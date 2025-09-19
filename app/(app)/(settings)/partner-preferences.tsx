import React from 'react';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { YStack } from 'tamagui';
import { PersonalPreferences } from '@/components/settings/partner-preference/PersonalPreferences';
import {
  PartnerPreferenceFormType,
  toPartnerPreferenceFormType,
  toPartnerPreferencesRequest,
} from '@/resources/form';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { OtherPreferences } from '@/components/settings/partner-preference/OtherPreferences';
import { ProfessionalPreferences } from '@/components/settings/partner-preference/ProfessionalPreferences';
import { useUserRepository } from '@/services/api/repositories/useUserRepository';
import { useLoader } from '@/components/loader/LoaderContext';
import { useAppSelector } from '@/services/store/hook';
import { router, useLocalSearchParams } from 'expo-router';
import { useStoreUser } from '@/hooks/useStoreUser';
import { useError } from '@/components/error/useError';
import { partnerPreferenceSchema } from '@/resources/validations/partner-preference';

export default function PartnerPreferences() {
  const { partnerPreferences } = useAppSelector(
    state => state.user,
  );
  const { showLoader, hideLoader } = useLoader();
  const userRepository = useUserRepository();
  const { purpose } = useLocalSearchParams<{
    purpose: 'ONBOARDING' | 'UPDATE';
  }>();
  const { storePartnerPreferences } = useStoreUser();
  const { showError } = useError();

  const initialValues: PartnerPreferenceFormType =
    toPartnerPreferenceFormType(partnerPreferences);

  const onConfirm = async (values: PartnerPreferenceFormType) => {
    const request = toPartnerPreferencesRequest(values);
    showLoader();
    try {
      const response = await userRepository.updatePartnerPreferences(request);
      if (response.preference) {
        storePartnerPreferences(response.preference);
      }
      hideLoader();
      if (purpose === 'UPDATE') {
        router.back();
      } else {
        router.replace('/(app)/(onboarding)');
      }
    } catch (error: any) {
      showError({ description: error.message || 'Failed to update partner preferences' });
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
