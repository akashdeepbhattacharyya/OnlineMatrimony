import { ViewProps, YStack } from 'tamagui';
import { PreferenceItem } from './PreferenceItem';
import { PartnerPreferenceFormType } from '@/resources/form';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import { occupationOptions, occupations } from '@/resources/occupation';
import { educationOptions, educations } from '@/resources/education';
import { PreferenceSlider } from './PreferenceSlider';
import { TileHeader } from '../../common/TileHeader';
import { MultiSelectButton } from '../../common/MultiSelectButton';
import { formatAnnualIncome } from '@/utils/utils';

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

      <PreferenceItem title="Annual Income">
        <PreferenceSlider
          minTitle={`Min ${formatAnnualIncome(values.minIncome)}`}
          maxTitle={`Max ${formatAnnualIncome(values.maxIncome)}`}
          sliderValue={{
            min: values.minIncome,
            max: values.maxIncome,
          }}
          onValuesChange={(sliderValue) => {
            setFieldValue('maxIncome', sliderValue.max);
            setFieldValue('minIncome', sliderValue.min);
          }}
          max={10000000}
          min={500000}
          step={100000}
        />
      </PreferenceItem>
    </YStack>
  );
};
