import {
  YStack,
  ViewProps,
  View,
  getToken
} from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { ProfileTileHeader } from './ProfileTileHeader';
import { User } from '@/src/models/Authentication';
import { LabelledTextField } from '../common/LabelledTextField';
import { Text } from '@/src/components/common/Text';
import PersonIcon from '@/assets/images/icon_person.svg';
import EmailIcon from '@/assets/images/icon_email.svg';
import PhoneIcon from '@/assets/images/icon_phone.svg';
import { ChangeEvent, FocusEvent, use, useEffect, useState } from 'react';
import { LabelledButton } from '../common/LabelledButton';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, TouchableOpacity } from 'react-native';
import { CheckBoxButtonGroup } from '../common/CheckBoxButtonGroup';
import { CheckBoxOption, Option } from '@/src/resources/form';
import { Gender, genders, getGenderIcon } from '@/src/resources/gender';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type Props = {
  userProfile: User;
  isEdit?: boolean;
  values?: any;
  touched?: Record<string, boolean>;
  setFieldValue?: (field: string, value: any) => void;
  handleChange?: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  handleBlur?: {
    (e: FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  errors?: Record<string, string>;
} & ViewProps;

export const PersonalInformation = ({
  userProfile,
  isEdit,
  touched,
  errors,
  handleChange,
  setFieldValue,
  handleBlur,
  values,
  ...props
}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<Option<string> | undefined>();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  useEffect(() => {
    if (userProfile.profile) {
      const dob: any = userProfile.profile.dateOfBirth;
      setSelectedGender({ label: userProfile.profile.gender, value: values.gender.toLowerCase() });
      handleDateChange(null, new Date(dob.join('-')), setFieldValue);
    }
  }, [userProfile])
  const handleDateChange = (
    event: any,
    date: Date | undefined,
    setFieldValue: any
  ) => {
    setShowDatePicker(false);
    if (date) {
      const formatted = `${String(date.getDate()).padStart(2, '0')}/${String(
        date.getMonth() + 1
      ).padStart(2, '0')}/${date.getFullYear()}`;
      setFieldValue('dateOfBirth', date);
      setSelectedDate(formatted);

    }
  };

  const handleGenderChange = (option: Option<string>, setFieldValue: any) => {
    setFieldValue('gender', option.value.toUpperCase());
    setSelectedGender(option);
  };

  const getCurrentAddress = async () => {
    try {
      setIsFetchingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setIsFetchingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      const formatted = `${address.name || ''}, ${address.street || ''}, ${address.city || ''}, ${address.postalCode || ''}, ${address.country || ''}`;
      setFieldValue?.('address', formatted);
      setFieldValue?.('city', address.city || '');
      setFieldValue?.('country', address.country || '');
    } catch (error) {
      alert('Failed to fetch location');
      console.error(error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

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
        )
      }
    ],
    []
  );

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

      {/* Read-only mode */}
      {!isEdit && (
        <>
          <ProfileItem title="Full Name" subtitle={userProfile.profile.fullName} />
          <ProfileItem title="Date of Birth" subtitle={userProfile.profile.dateOfBirth} />
          <ProfileItem
            title="Gender"
            subtitle={
              userProfile.profile.gender.charAt(0).toUpperCase() +
              userProfile.profile.gender.slice(1)
            }
          />
          <ProfileItem title="Address" subtitle={userProfile.profile.address} />
          <ProfileItem title="Phone" subtitle={userProfile.phone} />
        </>
      )}

      {/* Editable mode */}
      {isEdit && (
        <YStack gap={'$6'} width="100%">
          {/* Full Name */}
          <YStack gap={'$2'}>
            <LabelledTextField
              label="Full Name"
              placeholder="Enter Your Full Name"
              icon={<PersonIcon />}
              onChangeText={handleChange?.('fullName')}
              onBlur={handleBlur?.('fullName')}
              value={values?.fullName ?? ''}
            />
            {touched?.fullName && errors?.fullName && (
              <Text theme={'error_message'}>{errors.fullName}</Text>
            )}
          </YStack>

          {/* Age */}
          <YStack gap={'$2'}>
            <LabelledTextField
              label="Age"
              placeholder="Enter Your Age"
              icon={<EmailIcon />}
              onChangeText={handleChange?.('age')}
              onBlur={handleBlur?.('age')}
              value={values?.age ?? ''}
              keyboardType="numeric"
            />
            {touched?.age && errors?.age && (
              <Text theme={'error_message'}>{errors.age}</Text>
            )}
          </YStack>

          {/* Phone */}
          <YStack gap={'$2'}>
            <LabelledTextField
              label="Phone No."
              placeholder="Enter Your Phone No."
              icon={<PhoneIcon />}
              onChangeText={handleChange?.('phone')}
              onBlur={handleBlur?.('phone')}
              value={values?.phone ?? ''}
              keyboardType="number-pad"
            />
            {touched?.phone && errors?.phone && (
              <Text theme={'error_message'}>{errors.phone}</Text>
            )}
          </YStack>

          {/* Date of Birth */}
          <YStack gap={'$2'}>
            <LabelledButton
              label="Date Of Birth"
              icon={<Entypo name="cake" color="#000000" size={20} />}
              onPress={() => setShowDatePicker(true)}
              title={selectedDate || 'DD / MM / YYYY'}
              titleProps={{
                color:
                  selectedDate === '' ? '$placeholder' : '$color'
              }}
            />
            {touched?.dateOfBirth && errors?.dateOfBirth && (
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
                  value={values.dateOfBirth}
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
                onChange={option =>
                  handleGenderChange(option, setFieldValue)
                }
              />
            </YStack>
            {touched?.gender && errors?.gender && (
              <Text theme={'error_message'}>{errors.gender}</Text>
            )}
          </YStack>

          {/* Address */}
          <YStack gap={'$2'}>
            <LabelledTextField
              label="Address"
              placeholder="Enter Your Address"
              icon={<Entypo name="location-pin" size={20} color="#000" />}
              onChangeText={handleChange?.('address')}
              onBlur={handleBlur?.('address')}
              value={values?.address ?? ''}
              multiline
              numberOfLines={3}
            />
            {touched?.address && errors?.address && (
              <Text theme={'error_message'}>{errors.address}</Text>
            )}

            <TouchableOpacity onPress={getCurrentAddress}>
              <Text color="$color" fontWeight="bold">
                {isFetchingLocation ? 'Fetching location...' : 'Use Current Location'}
              </Text>
            </TouchableOpacity>
          </YStack>
          <YStack gap={'$2'}>
            <LabelledTextField
              label="City"
              placeholder="Enter Your City"
              icon={<MaterialCommunityIcons name="city" size={24} color="#000" />}
              onChangeText={handleChange?.('city')}
              onBlur={handleBlur?.('city')}
              value={values?.city ?? ''}
              keyboardType="number-pad"
            />
            {touched?.city && errors?.city && (
              <Text theme={'error_message'}>{errors.city}</Text>
            )}
          </YStack>
          <YStack gap={'$2'}>
            <LabelledTextField
              label="Country"
              placeholder="Enter Your Country"
              icon={<MaterialCommunityIcons name="earth" size={24} color="#000" />}
              onChangeText={handleChange?.('country')}
              onBlur={handleBlur?.('country')}
              value={values?.country ?? ''}
              keyboardType="number-pad"
            />
            {touched?.country && errors?.country && (
              <Text theme={'error_message'}>{errors.country}</Text>
            )}
          </YStack>
        </YStack>
      )}
    </YStack>
  );
};
