import React from 'react';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { YStack } from 'tamagui';
import { PersonalPreferences } from '@/src/components/settings/partner-preference/PersonalPreferences';
import { PartnerPreferenceFormType } from '@/src/resources/form';
import { PrimaryButton } from '@/src/components/common/PrimaryButton';
import { partnerPreferenceSchema } from '@/src/resources/validations/partner-preference';
import { OtherPreferences } from '@/src/components/settings/partner-preference/OtherPreferences';

export default function PartnerPreferenceScreen() {
  const initialValues: PartnerPreferenceFormType = {
    ageRange: { min: 25, max: 50 },
    heightRange: { min: 4.5, max: 7 },
    maritalStatus: undefined,
    gender: undefined,
    city: undefined,
    state: undefined,
  };

  const onConfirm = async (values: PartnerPreferenceFormType) => {
    console.log('Updated values:', values);
  };

  return (
    <Screen>
      <ScreenHeader headerText="Partner Preference" />
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
            >
              <YStack gap={'$4'}>
                <PersonalPreferences />
                <OtherPreferences />
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
