import { ViewProps, YStack } from 'tamagui';
import { PreferenceSlider } from './PreferenceSlider';
import { SliderValue } from '../../common/Slider';
import { formatFeetInch } from '@/src/utils/utils';
import { PreferenceItem } from './PreferenceItem';
import { cityOptions, State, stateOptions } from '@/src/resources/city-state';
import { PartnerPreferenceFormType } from '@/src/resources/form';
import { PreferenceSelect } from './PreferenceSelect';
import { genderOptions } from '@/src/resources/gender';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import { maritalStatusOptions } from '@/src/resources/marital-status';
import { TileHeader } from '../../common/TileHeader';

export const PersonalPreferences = ({ ...props }: ViewProps) => {
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
      <TileHeader title="Personal Preferences" />
      <YStack gap={'$2'}>
        <PreferenceItem title="Age">
          <PreferenceSlider
            minTitle={`Min ${values.ageRange.min} Yrs`}
            maxTitle={`Max ${values.ageRange.max} Yrs`}
            sliderValue={values.ageRange}
            onValuesChange={(sliderValue: SliderValue) => {
              setFieldValue('ageRange', sliderValue);
            }}
            step={1}
          />
        </PreferenceItem>
        {touched.ageRange && errors.ageRange && (
          <Text theme={'error_message'}>{errors.ageRange}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Height">
          <PreferenceSlider
            minTitle={`Min ${formatFeetInch(values.heightRange.min)}`}
            maxTitle={`Max ${formatFeetInch(values.heightRange.max)}`}
            sliderValue={values.heightRange}
            onValuesChange={(sliderValue: SliderValue) => {
              setFieldValue('heightRange', sliderValue);
            }}
            step={0.5}
          />
        </PreferenceItem>
        {touched.heightRange && errors.heightRange && (
          <Text theme={'error_message'}>{errors.heightRange}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Marital Status">
          <PreferenceSelect
            options={maritalStatusOptions}
            placeholder="Select Marital Status"
            onChange={value => setFieldValue('maritalStatus', value)}
            initialValue={maritalStatusOptions.find(
              option => option.value === values.maritalStatus,
            )}
            title="Select Marital Status"
          />
        </PreferenceItem>
        {touched.maritalStatus && errors.maritalStatus && (
          <Text theme={'error_message'}>{errors.maritalStatus}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Gender">
          <PreferenceSelect
            options={genderOptions}
            placeholder="Select Gender"
            onChange={value => setFieldValue('gender', value)}
            initialValue={genderOptions.find(
              option => option.value === values.gender,
            )}
            title="Select Gender"
          />
        </PreferenceItem>
        {touched.gender && errors.gender && (
          <Text theme={'error_message'}>{errors.gender}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="State">
          <PreferenceSelect
            options={stateOptions}
            placeholder="Select State"
            onChange={value => setFieldValue('state', value)}
            initialValue={stateOptions.find(
              option => option.value === values.state,
            )}
            title="Select State"
          />
        </PreferenceItem>
        {touched.state && errors.state && (
          <Text theme={'error_message'}>{errors.state}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="City">
          <PreferenceSelect
            options={cityOptions(values.state as State)}
            placeholder="Select City"
            onChange={value => setFieldValue('city', value)}
            initialValue={cityOptions(values.state as State).find(
              option => option.value === values.city,
            )}
            title="Select City"
          />
        </PreferenceItem>
        {touched.city && errors.city && (
          <Text theme={'error_message'}>{errors.city}</Text>
        )}
      </YStack>
    </YStack>
  );
};
