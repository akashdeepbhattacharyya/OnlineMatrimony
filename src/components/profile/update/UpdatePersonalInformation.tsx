import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps, getToken, View } from 'tamagui';
import { ProfileTileHeader } from '../ProfileTileHeader';
import { LabelledTextField } from '../../common/LabelledTextField';
import { useFormikContext } from 'formik';
import {
  CheckBoxOption,
  Option,
  UpdateUserProfileFormType,
} from '@/src/resources/form';
import { Text } from '@/src/components/common/Text';
import PersonIcon from '@/assets/images/icon_person.svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { CheckBoxButtonGroup } from '../../common/CheckBoxButtonGroup';
import { LabelledButton } from '../../common/LabelledButton';
import { genders, getGenderIcon, Gender } from '@/src/resources/gender';
import DateTimePicker from '@react-native-community/datetimepicker';
import DOBIcon from '@/assets/images/icon-dob.svg';
import {
  cities,
  City,
  State,
  stateCityMapping,
  states,
} from '@/src/resources/update-profile';
import { useState } from 'react';
import { LabelledSelect } from '../../common/LabelledSelect';
import StateIcon from '@/assets/images/icon-state.svg';
import CityIcon from '@/assets/images/icon-city.svg';
import PinIcon from '@/assets/images/icon-pin.svg';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const UpdatePersonalInformation = ({ userProfile, ...props }: Props) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<UpdateUserProfileFormType>();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const genderOptions: CheckBoxOption<string>[] = Object.keys(genders).reduce(
    (list: CheckBoxOption<string>[], value) => [
      ...list,
      {
        label: genders[value as keyof typeof genders],
        value,
        icon: (
          <MaterialIcons
            name={getGenderIcon(value as Gender)}
            size={40}
            color={
              selectedGender == undefined
                ? getToken('$color.white')
                : selectedGender?.value == value
                ? getToken('$color.button_bg_red')
                : getToken('$color.gray')
            }
            style={{ marginLeft: 8 }}
          />
        ),
      },
    ],
    [],
  );

  const stateOptions: Option<State>[] = Object.keys(states).reduce(
    (list: Option<State>[], value) => [
      ...list,
      {
        label: states[value as keyof typeof states],
        value: value as State,
      },
    ],
    [],
  );

  const cityOptions = (state: State): Option<City>[] => {
    if (!state) return [];
    return stateCityMapping[state].reduce(
      (list: Option<City>[], value) => [
        ...list,
        {
          label: cities[value as keyof typeof cities],
          value: value as City,
        },
      ],
      [],
    );
  };

  const [selectedGender, setSelectedGender] = useState<
    CheckBoxOption<string> | undefined
  >(
    values.gender
      ? {
          label: genders[values.gender as keyof typeof genders],
          value: values.gender,
          icon: (
            <MaterialIcons
              name={getGenderIcon(values.gender as Gender)}
              size={40}
              color={getToken('$color.button_bg_red')}
              style={{ marginLeft: 8 }}
            />
          ),
        }
      : undefined,
  );

  const handleGenderChange = (
    option: CheckBoxOption<string>,
    setFieldValue: any,
  ) => {
    setSelectedGender(option);
    setFieldValue('gender', option.value);
  };

  const handleDateChange = (
    event: any,
    date: Date | undefined,
    setFieldValue: any,
  ) => {
    if (date) {
      setSelectedDate(date);
      setFieldValue('dateOfBirth', date.toLocaleDateString());
    }
    setShowDatePicker(false);
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
      <ProfileTileHeader title="Personal Information" />
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

        {/* DOB Date Picker */}
        <YStack gap={'$2'}>
          <LabelledButton
            label="Date Of Birth"
            icon={<DOBIcon />}
            onPress={() => setShowDatePicker(true)}
            title={values.dateOfBirth || 'DD / MM / YYYY'}
            titleProps={{
              color: values.dateOfBirth === '' ? '$placeholder' : '$color',
            }}
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <Text theme={'error_message'}>{errors.dateOfBirth}</Text>
          )}

          {showDatePicker && (
            <View
              theme="date_picker"
              backgroundColor={'$background'}
              alignItems="center"
              padding={'$4'}
              borderRadius={'$10'}
              marginTop={'$2'}
            >
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()}
                onChange={(event, date) =>
                  handleDateChange(event, date, setFieldValue)
                }
                style={{ backgroundColor: getToken('$color.white') }}
              />
            </View>
          )}
        </YStack>

        {/* Gender */}
        <YStack gap={'$2'}>
          <YStack>
            <Text size="normal" font="heading" color="$color">
              Select Gender
            </Text>
            <CheckBoxButtonGroup
              options={genderOptions}
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
            value={values.state}
            onChange={value => {
              setFieldValue('state', value);
              setFieldValue('city', '');
              setFieldValue('pincode', '');
            }}
            options={stateOptions}
            placeholder="Select Your State"
            icon={<StateIcon />}
            initialValue={stateOptions.find(
              option => option.value === values.state,
            )}
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
            value={values.city}
            onChange={value => {
              setFieldValue('city', value), setFieldValue('pincode', '');
            }}
            options={cityOptions(values.state as State)}
            placeholder="Select Your City"
            icon={<CityIcon />}
            initialValue={cityOptions(values.state as State).find(
              option => option.value === values.city,
            )}
            disabled={!values.state}
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
    </YStack>
  );
};
