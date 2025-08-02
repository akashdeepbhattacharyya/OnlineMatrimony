import { ViewProps, YStack } from 'tamagui';
import { PreferenceItem } from './PreferenceItem';
import { PartnerPreferenceFormType } from '@/src/resources/form';
import { PreferenceSelect } from './PreferenceSelect';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import { dietOptions, diets } from '@/src/resources/diet';
import { casteOptions, castes } from '@/src/resources/caste';
import {
  motherTongueOptions,
  motherTongues,
} from '@/src/resources/mother-tongue';
import { religionOptions, religions } from '@/src/resources/religion';
import { TileHeader } from '../../common/TileHeader';
import { MultiSelectButton } from '../../common/MultiSelectButton';

export const OtherPreferences = ({ ...props }: ViewProps) => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<PartnerPreferenceFormType>();

  return (
    <YStack
      theme={'profile_tile'}
      width={'100%'}
      gap={'$3'}
      backgroundColor={'$background'}
      paddingHorizontal="$4"
      paddingTop={'$4'}
      paddingBottom="$2"
      borderRadius="$8"
      {...props}
    >
      <TileHeader title="Other Preferences" />
      <YStack gap={'$2'}>
        <PreferenceItem title="Diet">
          <MultiSelectButton
            title="Select Diet"
            options={dietOptions}
            onChange={selected => {
              setFieldValue(
                'diet',
                selected.map(item => item.value),
              );
            }}
            initialValues={
              values.diets
                ? values.diets.map(diet => ({
                    label: diets[diet],
                    value: diet,
                  }))
                : undefined
            }
          />
        </PreferenceItem>
        {touched.diets && errors.diets && (
          <Text theme={'error_message'}>{errors.diets}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Religion">
          <MultiSelectButton
            title="Select Religion"
            options={religionOptions}
            onChange={selected => {
              setFieldValue(
                'religions',
                selected.map(item => item.value),
              );
            }}
            initialValues={
              values.religions
                ? values.religions.map(religion => ({
                    label: religions[religion],
                    value: religion,
                  }))
                : undefined
            }
          />
        </PreferenceItem>
        {touched.religions && errors.religions && (
          <Text theme={'error_message'}>{errors.religions}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Caste">
          <MultiSelectButton
            title="Select Caste"
            options={casteOptions}
            onChange={selected => {
              setFieldValue(
                'castes',
                selected.map(item => item.value),
              );
            }}
            initialValues={
              values.castes
                ? values.castes.map(caste => ({
                    label: castes[caste],
                    value: caste,
                  }))
                : undefined
            }
          />
        </PreferenceItem>
        {touched.castes && errors.castes && (
          <Text theme={'error_message'}>{errors.castes}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Mother Tongue">
          <MultiSelectButton
            title="Select Mother Tongue"
            options={motherTongueOptions}
            onChange={selected => {
              setFieldValue(
                'motherTongue',
                selected.map(item => item.value),
              );
            }}
            initialValues={
              values.motherTongues
                ? values.motherTongues.map(motherTongue => ({
                    label: motherTongues[motherTongue],
                    value: motherTongue,
                  }))
                : undefined
            }
          />
        </PreferenceItem>
        {touched.motherTongues && errors.motherTongues && (
          <Text theme={'error_message'}>{errors.motherTongues}</Text>
        )}
      </YStack>
    </YStack>
  );
};
