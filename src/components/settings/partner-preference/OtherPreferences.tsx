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
            title={'Select Diet'}
            value={values.diets?.map(item => diets[item]).join(', ')}
            options={dietOptions}
            onChange={selected => {
              setFieldValue('diets', selected);
            }}
            selected={values.diets}
          />
        </PreferenceItem>
        {touched.diets && errors.diets && (
          <Text theme={'error_message'}>{errors.diets}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Religion">
          <MultiSelectButton
            title={'Select Religion'}
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
        <PreferenceItem title="Caste">
          <MultiSelectButton
            title={'Select Caste'}
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
          <MultiSelectButton
            title={'Select Mother Tongue'}
            value={values.motherTongues
              ?.map(item => motherTongues[item])
              .join(', ')}
            options={motherTongueOptions}
            onChange={selected => {
              setFieldValue('motherTongues', selected);
            }}
            selected={values.motherTongues}
          />
        </PreferenceItem>
        {touched.motherTongues && errors.motherTongues && (
          <Text theme={'error_message'}>{errors.motherTongues}</Text>
        )}
      </YStack>
    </YStack>
  );
};
