import { YStack, ViewProps } from 'tamagui';
import { TileHeader } from '../../common/TileHeader';
import { LabelledTextField } from '../../common/LabelledTextField';
import { useFormikContext } from 'formik';
import { UpdateUserProfileFormType } from '@/resources/form';
import { Text } from '@/components/common/Text';
import PersonIcon from '@/assets/images/icon_person.svg';
import { LabelledSelect } from '../../common/LabelledSelect';
import { dietOptions, diets } from '@/resources/diet';
import { religionOptions, religions } from '@/resources/religion';
import {
  maritalStatuses,
  maritalStatusOptions,
} from '@/resources/marital-status';
import { casteOptions, castes } from '@/resources/caste';
import {
  motherTongueOptions,
  motherTongues,
} from '@/resources/mother-tongue';

export const UpdateOtherInformation = ({ ...props }: ViewProps) => {
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
      <TileHeader title="Other Information" />
      <YStack gap={'$3.5'} width="100%">
        {/* Diet */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="Diet"
            title="Select Diet Preference"
            value={values.diet ? diets[values.diet] : undefined}
            onChange={value => setFieldValue('diet', value)}
            options={dietOptions}
            icon={<PersonIcon />}
          />
          {touched.diet && errors.diet && (
            <Text theme={'error_message'}>{errors.diet}</Text>
          )}
        </YStack>

        {/* Height */}
        <YStack gap={'$2'}>
          <LabelledTextField
            label="Height (in cm)"
            placeholder="Enter Your Height"
            icon={<PersonIcon />}
            onChangeText={handleChange('height')}
            onBlur={handleBlur('height')}
            value={values.height ? `${values.height}` : ''}
            keyboardType="numeric"
          />
          {touched.height && errors.height && (
            <Text theme={'error_message'}>{errors.height}</Text>
          )}
        </YStack>

        {/* Weight */}
        <YStack gap={'$2'}>
          <LabelledTextField
            label="Weight (in kg)"
            placeholder="Enter Your Weight"
            icon={<PersonIcon />}
            onChangeText={handleChange('weight')}
            onBlur={handleBlur('weight')}
            value={values.weight ? `${values.weight}` : ''}
            keyboardType="numeric"
          />
          {touched.weight && errors.weight && (
            <Text theme={'error_message'}>{errors.weight}</Text>
          )}
        </YStack>

        {/* Religion */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="Religion"
            title="Select Religion"
            value={values.religion ? religions[values.religion] : undefined}
            onChange={value => setFieldValue('religion', value)}
            options={religionOptions}
            icon={<PersonIcon />}
          />
          {touched.religion && errors.religion && (
            <Text theme={'error_message'}>{errors.religion}</Text>
          )}
        </YStack>

        {/* Caste */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="Caste"
            title="Select Caste"
            value={values.caste ? castes[values.caste] : undefined}
            onChange={value => setFieldValue('caste', value)}
            options={casteOptions}
            icon={<PersonIcon />}
          />
          {touched.caste && errors.caste && (
            <Text theme={'error_message'}>{errors.caste}</Text>
          )}
        </YStack>

        {/* Mother Tongue */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="Mother Tongue"
            title="Select Mother Tongue"
            value={
              values.motherTongue
                ? motherTongues[values.motherTongue]
                : undefined
            }
            onChange={value => setFieldValue('motherTongue', value)}
            options={motherTongueOptions}
            icon={<PersonIcon />}
          />
          {touched.motherTongue && errors.motherTongue && (
            <Text theme={'error_message'}>{errors.motherTongue}</Text>
          )}
        </YStack>

        {/* Marital Status */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="Marital Status"
            title="Select Marital Status"
            value={
              values.maritalStatus
                ? maritalStatuses[values.maritalStatus]
                : undefined
            }
            onChange={value => setFieldValue('maritalStatus', value)}
            options={maritalStatusOptions}
            icon={<PersonIcon />}
          />
          {touched.maritalStatus && errors.maritalStatus && (
            <Text theme={'error_message'}>{errors.maritalStatus}</Text>
          )}
        </YStack>
      </YStack>
    </YStack>
  );
};
