import { ViewProps, YStack } from 'tamagui';
import { PreferenceSlider } from './PreferenceSlider';
import { SliderValue } from '../../common/Slider';
import { formatFeetInch } from '@/src/utils/utils';
import { PreferenceItem } from './PreferenceItem';
import {
  cities,
  cityOptionsByStates,
  stateOptions,
  states,
} from '@/src/resources/city-state';
import { PartnerPreferenceFormType } from '@/src/resources/form';
import { PreferenceSelect } from './PreferenceSelect';
import { genderOptions } from '@/src/resources/gender';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import {
  maritalStatuses,
  maritalStatusOptions,
} from '@/src/resources/marital-status';
import { TileHeader } from '../../common/TileHeader';
import { MultiSelectButton } from '../../common/MultiSelectButton';

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
          <MultiSelectButton
            title="Select Marital Status"
            options={maritalStatusOptions}
            onChange={selected => {
              setFieldValue(
                'maritalStatuses',
                selected.map(item => item.value),
              );
            }}
            initialValues={
              values.maritalStatuses
                ? values.maritalStatuses.map(status => ({
                    label: maritalStatuses[status],
                    value: status,
                  }))
                : undefined
            }
          />
        </PreferenceItem>
        {touched.maritalStatuses && errors.maritalStatuses && (
          <Text theme={'error_message'}>{errors.maritalStatuses}</Text>
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
          <MultiSelectButton
            title="Select State"
            options={stateOptions}
            onChange={selected => {
              setFieldValue(
                'states',
                selected.map(item => item.value),
              );
              setFieldValue('cities', undefined); // Reset city when state changes
            }}
            initialValues={
              values.states
                ? values.states.map(state => ({
                    label: states[state],
                    value: state,
                  }))
                : undefined
            }
          />
        </PreferenceItem>
        {touched.states && errors.states && (
          <Text theme={'error_message'}>{errors.states}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="City">
          <MultiSelectButton
            title="Select City"
            options={cityOptionsByStates(values.states || [])}
            onChange={selected => {
              setFieldValue(
                'cities',
                selected.map(item => item.value),
              );
            }}
            initialValues={
              values.cities
                ? values.cities.map(city => ({
                    label: cities[city],
                    value: city,
                  }))
                : undefined
            }
          />
        </PreferenceItem>
        {touched.cities && errors.cities && (
          <Text theme={'error_message'}>{errors.cities}</Text>
        )}
      </YStack>
    </YStack>
  );
};
