import { YStack, ViewProps } from 'tamagui';
import { TileHeader } from '../../common/TileHeader';
import { LabelledTextField } from '../../common/LabelledTextField';
import { useFormikContext } from 'formik';
import {
  OptionWithIcon,
  UpdateUserProfileFormType,
} from '@/resources/form';
import { Text } from '@/components/common/Text';
import PersonIcon from '@/assets/images/icon_person.svg';
import { CheckBoxButtonGroup } from '../../common/CheckBoxButtonGroup';
import { LabelledButton } from '../../common/LabelledButton';
import { Gender, genderOptionsWithIcons } from '@/resources/gender';
import DOBIcon from '@/assets/images/icon-dob.svg';
import {
  cities,
  City,
  cityOptions,
  State,
  stateOptions,
  states,
} from '@/resources/city-state';
import { useState } from 'react';
import { LabelledSelect } from '../../common/LabelledSelect';
import StateIcon from '@/assets/images/icon-state.svg';
import CityIcon from '@/assets/images/icon-city.svg';
import PinIcon from '@/assets/images/icon-pin.svg';
import {
  formatDate,
  formatDateString,
  parseDate,
} from '@/utils/dateFormatter';
import { DateTimePicker } from '../../common/DateTimePicker';

export const UpdatePersonalInformation = ({ ...props }: ViewProps) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<UpdateUserProfileFormType>();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(
    values.gender as Gender | undefined,
  );

  const handleGenderChange = (
    option: OptionWithIcon<Gender>,
    setFieldValue: any,
  ) => {
    setSelectedGender(option.value);
    setFieldValue('gender', option.value);
  };

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
      <TileHeader title="Personal Information" />
      <YStack gap={'$3.5'} width="100%">
        {/* Full Name */}
        <YStack gap={'$2'}>
          <LabelledTextField
            label="Full Name"
            placeholder="Enter Your Full Name"
            icon={<PersonIcon />}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            value={values.fullName}
          />
          {touched.fullName && errors.fullName && (
            <Text theme={'error_message'}>{errors.fullName}</Text>
          )}
        </YStack>

        {/* DOB */}
        <YStack gap={'$2'}>
          <LabelledButton
            label="Date Of Birth"
            icon={<DOBIcon />}
            onPress={() => setShowDatePicker(true)}
            title={formatDateString(values.dateOfBirth) || 'DD / MM / YYYY'}
            titleProps={{
              color: values.dateOfBirth === '' ? '$placeholder' : '$color',
            }}
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <Text theme={'error_message'}>{errors.dateOfBirth}</Text>
          )}
        </YStack>

        {/* Gender */}
        <YStack gap={'$2'}>
          <YStack>
            <Text size="normal" font="heading" color="$color">
              Select Gender
            </Text>
            <CheckBoxButtonGroup
              options={genderOptionsWithIcons(selectedGender)}
              selectedOption={selectedGender}
              onChange={option => handleGenderChange(option, setFieldValue)}
            />
          </YStack>
          {touched.gender && errors.gender && (
            <Text theme={'error_message'}>{errors.gender}</Text>
          )}
        </YStack>

        {/* State */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="State"
            title="Select State"
            value={states[values.state as State]}
            onChange={value => {
              setFieldValue('state', value);
              setFieldValue('city', '');
              setFieldValue('pincode', '');
            }}
            options={stateOptions}
            selected={values.state}
            icon={<StateIcon />}
          />

          {touched.state && errors.state && (
            <Text theme={'error_message'}>{errors.state}</Text>
          )}
        </YStack>

        {/* City */}
        <YStack gap={'$2'}>
          <LabelledSelect
            label="City"
            title="Select City"
            value={cities[values.city as City]}
            onChange={value => {
              setFieldValue('city', value);
              setFieldValue('pincode', '');
            }}
            options={cityOptions(values.state as State)}
            selected={values.city}
            disabled={!values.state} // Disable if state is not selected
            icon={<CityIcon />}
          />

          {touched.city && errors.city && (
            <Text theme={'error_message'}>{errors.city}</Text>
          )}
        </YStack>

        {/* Pincode */}
        <YStack gap={'$2'}>
          <LabelledTextField
            label="Pincode"
            placeholder="Enter Your Pincode"
            icon={<PinIcon />}
            onChangeText={handleChange('pincode')}
            onBlur={handleBlur('pincode')}
            value={values.pincode}
            keyboardType="numeric"
          />
          {touched.pincode && errors.pincode && (
            <Text theme={'error_message'}>{errors.pincode}</Text>
          )}
        </YStack>
      </YStack>
      <DateTimePicker
        isVisible={showDatePicker}
        mode="date"
        onConfirm={date => {
          setFieldValue('dateOfBirth', formatDate(date));
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        selectedDate={
          values.dateOfBirth && typeof values.dateOfBirth === 'string'
            ? parseDate(values.dateOfBirth)
            : undefined
        }
      />
    </YStack>
  );
};
