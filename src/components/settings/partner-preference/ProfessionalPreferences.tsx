import { ViewProps, YStack } from 'tamagui';
import { PreferenceItem } from './PreferenceItem';
import { PartnerPreferenceFormType } from '@/src/resources/form';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import { occupationOptions, occupations } from '@/src/resources/occupation';
import { educationOptions, educations } from '@/src/resources/education';
import { SliderValue } from '../../common/Slider';
import { PreferenceSlider } from './PreferenceSlider';
import { TileHeader } from '../../common/TileHeader';
import { MultiSelectButton } from '../../common/MultiSelectButton';
import { formatAnnualIncome } from '@/src/utils/utils';

export const ProfessionalPreferences = ({ ...props }: ViewProps) => {
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
      <TileHeader title="Professional Preferences" />
      <YStack gap={'$2'}>
        <PreferenceItem title="Educations">
          <MultiSelectButton
            title={'Select Educations'}
            value={values.educations?.map(item => educations[item]).join(', ')}
            options={educationOptions}
            onChange={selected => {
              setFieldValue('educations', selected);
            }}
            selected={values.educations}
          />
        </PreferenceItem>
        {touched.educations && errors.educations && (
          <Text theme={'error_message'}>{errors.educations}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Occupations">
          <MultiSelectButton
            title={'Select Occupations'}
            value={values.occupations
              ?.map(item => occupations[item])
              .join(', ')}
            options={occupationOptions}
            onChange={selected => {
              setFieldValue('occupations', selected);
            }}
            selected={values.occupations}
          />
        </PreferenceItem>
        {touched.occupations && errors.occupations && (
          <Text theme={'error_message'}>{errors.occupations}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Annual Income">
          <PreferenceSlider
            minTitle={`Min ${formatAnnualIncome(values.annualIncomeRange.min)}`}
            maxTitle={`Max ${formatAnnualIncome(values.annualIncomeRange.max)}`}
            sliderValue={values.annualIncomeRange}
            onValuesChange={(sliderValue: SliderValue) => {
              setFieldValue('annualIncomeRange', sliderValue);
            }}
            max={10000000}
            min={500000}
            step={100000}
          />
        </PreferenceItem>
        {touched.annualIncomeRange && errors.annualIncomeRange && (
          <Text theme={'error_message'}>{errors.annualIncomeRange}</Text>
        )}
      </YStack>
    </YStack>
  );
};
