import { ViewProps, YStack } from 'tamagui';
import { PreferenceSlider } from './PreferenceSlider';
import { SliderValue } from '../../common/Slider';
import { toFeetAndInches } from '@/utils/utils';
import { PreferenceItem } from './PreferenceItem';
import {
  cities,
  cityOptionsByStates,
  stateOptions,
  states,
} from '@/resources/city-state';
import { PartnerPreferenceFormType } from '@/resources/form';
import { PreferenceSelect } from './PreferenceSelect';
import { genderOptions, genders } from '@/resources/gender';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import {
  maritalStatuses,
  maritalStatusOptions,
} from '@/resources/marital-status';
import { TileHeader } from '../../common/TileHeader';
import { MultiSelectButton } from '../../common/MultiSelectButton';
import { SelectButton } from '../../common/SelectButton';

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
      <PreferenceItem title="Age">
        <PreferenceSlider
          minTitle={`Min ${values.minAge} Yrs`}
          maxTitle={`Max ${values.maxAge} Yrs`}
          sliderValue={{
            min: values.minAge,
            max: values.maxAge,
          }}
          onValuesChange={(sliderValue: SliderValue) => {
            setFieldValue('maxAge', sliderValue.max);
            setFieldValue('minAge', sliderValue.min);
          }}
          max={46}
          min={25}
          step={1}
        />
      </PreferenceItem>

      <PreferenceItem title="Height">
        <PreferenceSlider
          minTitle={`Min ${toFeetAndInches(values.minHeight)}`}
          maxTitle={`Max ${toFeetAndInches(values.maxHeight)}`}
          sliderValue={{
            min: values.minHeight,
            max: values.maxHeight,
          }}
          onValuesChange={(sliderValue: SliderValue) => {
            setFieldValue('maxHeight', sliderValue.max);
            setFieldValue('minHeight', sliderValue.min);
          }}
          max={213}
          min={137}
          step={15}
        />
      </PreferenceItem>

      <YStack gap={'$2'}>
        <PreferenceItem title="Marital Statuses">
          <MultiSelectButton
            title={'Select Marital Statuses'}
            value={values.maritalStatuses
              ?.map(item => maritalStatuses[item])
              .join(', ')}
            options={maritalStatusOptions}
            onChange={selected => {
              setFieldValue('maritalStatuses', selected);
            }}
            selected={values.maritalStatuses}
          />
        </PreferenceItem>
        {touched.maritalStatuses && errors.maritalStatuses && (
          <Text theme={'error_message'}>{errors.maritalStatuses}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Gender">
          <SelectButton
            title="Select Gender"
            theme="select_dark_mode"
            value={values.gender ? genders[values.gender] : undefined}
            options={genderOptions}
            onChange={selected => {
              setFieldValue('gender', selected);
            }}
            selected={values.gender}
          />
        </PreferenceItem>
        {touched.gender && errors.gender && (
          <Text theme={'error_message'}>{errors.gender}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="States">
          <MultiSelectButton
            title={'Select States'}
            value={values.states?.map(item => states[item]).join(', ')}
            options={stateOptions}
            onChange={selected => {
              setFieldValue('states', selected);
              setFieldValue('cities', undefined); // Reset city when state changes
            }}
            selected={values.states}
          />
        </PreferenceItem>
        {touched.states && errors.states && (
          <Text theme={'error_message'}>{errors.states}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Cities">
          <MultiSelectButton
            title={'Select Cities'}
            value={values.cities?.map(item => cities[item]).join(', ')}
            options={cityOptionsByStates(values.states || [])}
            onChange={selected => {
              setFieldValue('cities', selected);
            }}
            selected={values.cities}
          />
        </PreferenceItem>
        {touched.cities && errors.cities && (
          <Text theme={'error_message'}>{errors.cities}</Text>
        )}
      </YStack>
    </YStack>
  );
};
