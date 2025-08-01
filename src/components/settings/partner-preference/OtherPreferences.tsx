import { ViewProps, YStack } from 'tamagui';
import { PreferenceItem } from './PreferenceItem';
import { PartnerPreferenceFormType } from '@/src/resources/form';
import { PreferenceSelect } from './PreferenceSelect';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import { dietOptions } from '@/src/resources/diet';
import { casteOptions } from '@/src/resources/caste';
import { motherTongueOptions } from '@/src/resources/mother-tongue';
import { religionOptions } from '@/src/resources/religion';
import { ProfileTileHeader } from '../../profile/ProfileTileHeader';

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
      <ProfileTileHeader title="Other Preferences" />
      <YStack gap={'$2'}>
        <PreferenceItem title="Diet">
          <PreferenceSelect
            options={dietOptions}
            placeholder="Select Diet"
            onChange={value => setFieldValue('diet', value)}
            initialValue={dietOptions.find(
              option => option.value === values.diet,
            )}
            title="Select Diet"
          />
        </PreferenceItem>
        {touched.diet && errors.diet && (
          <Text theme={'error_message'}>{errors.diet}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Religion">
          <PreferenceSelect
            options={religionOptions}
            placeholder="Select Religion"
            onChange={value => setFieldValue('religion', value)}
            initialValue={religionOptions.find(
              option => option.value === values.religion,
            )}
            title="Select Religion"
          />
        </PreferenceItem>
        {touched.religion && errors.religion && (
          <Text theme={'error_message'}>{errors.religion}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Caste">
          <PreferenceSelect
            options={casteOptions}
            placeholder="Select Caste"
            onChange={value => setFieldValue('caste', value)}
            initialValue={casteOptions.find(
              option => option.value === values.caste,
            )}
            title="Select Caste"
          />
        </PreferenceItem>
        {touched.caste && errors.caste && (
          <Text theme={'error_message'}>{errors.caste}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Mother Tongue">
          <PreferenceSelect
            options={motherTongueOptions}
            placeholder="Select Mother Tongue"
            onChange={value => setFieldValue('motherTongue', value)}
            initialValue={motherTongueOptions.find(
              option => option.value === values.motherTongue,
            )}
            title="Select Mother Tongue"
          />
        </PreferenceItem>
        {touched.motherTongue && errors.motherTongue && (
          <Text theme={'error_message'}>{errors.motherTongue}</Text>
        )}
      </YStack>
    </YStack>
  );
};
