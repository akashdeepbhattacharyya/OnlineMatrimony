import { YStack, ViewProps } from 'tamagui';
import { TileHeader } from '../../common/TileHeader';
import { LabelledTextField } from '../../common/LabelledTextField';
import { useFormikContext } from 'formik';
import { UpdateUserProfileFormType } from '@/src/resources/form';
import { Text } from '@/src/components/common/Text';
import PersonIcon from '@/assets/images/icon_person.svg';
import { LabelledSelect } from '../../common/LabelledSelect';
import { educationOptions, educations } from '@/src/resources/education';
import { occupations, occupationOptions } from '@/src/resources/occupation';

export const UpdateProfessionalInformation = ({ ...props }: ViewProps) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<UpdateUserProfileFormType>();

  return (
    <YStack
      theme={'profile_tile'}
      width={'100%'}
      gap={'$4'}
      backgroundColor={'$background'}
      padding="$4"
      borderRadius="$8"
      {...props}
    >
      <TileHeader title="Professional Information" />
      <YStack gap={'$3.5'} width="100%">
        {/* Diet */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="Education"
            title="Select Education"
            value={values.education ? educations[values.education] : undefined}
            onChange={value => setFieldValue('education', value)}
            options={educationOptions}
            icon={<PersonIcon />}
          />
          {touched.education && errors.education && (
            <Text theme={'error_message'}>{errors.education}</Text>
          )}
        </YStack>

        {/* Occupation */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="Occupation"
            title="Select Occupation"
            value={
              values.occupation ? occupations[values.occupation] : undefined
            }
            onChange={value => setFieldValue('occupation', value)}
            options={occupationOptions}
            icon={<PersonIcon />}
          />
          {touched.occupation && errors.occupation && (
            <Text theme={'error_message'}>{errors.occupation}</Text>
          )}
        </YStack>

        {/* Height */}
        <YStack gap={'$2'}>
          <LabelledTextField
            label="Annual Income"
            placeholder="Enter Your Annual Income"
            icon={<PersonIcon />}
            onChangeText={handleChange('annualIncome')}
            onBlur={handleBlur('annualIncome')}
            value={values.annualIncome ? `${values.annualIncome}` : ''}
            keyboardType="numeric"
          />
          {touched.annualIncome && errors.annualIncome && (
            <Text theme={'error_message'}>{errors.annualIncome}</Text>
          )}
        </YStack>
      </YStack>
    </YStack>
  );
};
