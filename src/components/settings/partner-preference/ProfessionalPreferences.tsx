import { ViewProps, YStack } from 'tamagui';
import { PreferenceItem } from './PreferenceItem';
import { PartnerPreferenceFormType } from '@/src/resources/form';
import { PreferenceSelect } from './PreferenceSelect';
import { useFormikContext } from 'formik';
import { Text } from '../../common/Text';
import { occupationOptions } from '@/src/resources/occupation';
import { educationOptions } from '@/src/resources/education';
import { SliderValue } from '../../common/Slider';
import { PreferenceSlider } from './PreferenceSlider';
import { TileHeader } from '../../common/ProfileTileHeader';

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
        <PreferenceItem title="Education">
          <PreferenceSelect
            options={educationOptions}
            placeholder="Select Education"
            onChange={value => setFieldValue('education', value)}
            initialValue={educationOptions.find(
              option => option.value === values.education,
            )}
            title="Select Education"
          />
        </PreferenceItem>
        {touched.education && errors.education && (
          <Text theme={'error_message'}>{errors.education}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Occupation">
          <PreferenceSelect
            options={occupationOptions}
            placeholder="Select Occupation"
            onChange={value => setFieldValue('occupation', value)}
            initialValue={occupationOptions.find(
              option => option.value === values.occupation,
            )}
            title="Select Occupation"
          />
        </PreferenceItem>
        {touched.occupation && errors.occupation && (
          <Text theme={'error_message'}>{errors.occupation}</Text>
        )}
      </YStack>

      <YStack gap={'$2'}>
        <PreferenceItem title="Annual Income">
          <PreferenceSlider
            minTitle={`Min ${values.annualIncomeRange.min} LPA`}
            maxTitle={`Max ${values.annualIncomeRange.max} LPA`}
            sliderValue={values.annualIncomeRange}
            onValuesChange={(sliderValue: SliderValue) => {
              setFieldValue('annualIncomeRange', sliderValue);
            }}
            step={1}
          />
        </PreferenceItem>
        {touched.annualIncomeRange && errors.annualIncomeRange && (
          <Text theme={'error_message'}>{errors.annualIncomeRange}</Text>
        )}
      </YStack>
    </YStack>
  );
};
