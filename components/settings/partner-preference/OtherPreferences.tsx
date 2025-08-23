import { ViewProps, YStack } from 'tamagui';
import { PreferenceItem } from './PreferenceItem';
import { PartnerPreferenceFormType } from '@/resources/form';
import { PreferenceSelect } from './PreferenceSelect';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import { dietOptions, diets } from '@/resources/diet';
import { casteOptions, castes } from '@/resources/caste';
import {
  motherTongueOptions,
  motherTongues,
} from '@/resources/mother-tongue';
import { religionOptions, religions } from '@/resources/religion';
import { TileHeader } from '../../common/TileHeader';
import { MultiSelectButton } from '../../common/MultiSelectButton';
import { SelectButton } from '../../common/SelectButton';

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
          <SelectButton
            title="Select Diet"
            theme="select_dark_mode"
            value={values.diet ? diets[values.diet] : undefined}
            options={dietOptions}
            onChange={selected => {
              setFieldValue('diet', selected);
            }}
            selected={values.diet}
          />
        </PreferenceItem>
        {touched.diet && errors.diet && (
          <Text theme={'error_message'}>{errors.diet}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Religions">
          <MultiSelectButton
            title={'Select Religions'}
            value={values.religions?.map(item => religions[item]).join(', ')}
            options={religionOptions}
            onChange={selected => {
              setFieldValue('religions', selected);
            }}
            selected={values.religions}
          />
        </PreferenceItem>
        {touched.religions && errors.religions && (
          <Text theme={'error_message'}>{errors.religions}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Castes">
          <MultiSelectButton
            title={'Select Castes'}
            value={values.castes?.map(item => castes[item]).join(', ')}
            options={casteOptions}
            onChange={selected => {
              setFieldValue('castes', selected);
            }}
            selected={values.castes}
          />
        </PreferenceItem>
        {touched.castes && errors.castes && (
          <Text theme={'error_message'}>{errors.castes}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Mother Tongue">
          <SelectButton
            title="Select Mother Tongue"
            theme="select_dark_mode"
            value={
              values.motherTongue
                ? motherTongues[values.motherTongue]
                : undefined
            }
            options={motherTongueOptions}
            onChange={selected => {
              setFieldValue('motherTongue', selected);
            }}
            selected={values.motherTongue}
          />
        </PreferenceItem>
        {touched.motherTongue && errors.motherTongue && (
          <Text theme={'error_message'}>{errors.motherTongue}</Text>
        )}
      </YStack>
    </YStack>
  );
};
