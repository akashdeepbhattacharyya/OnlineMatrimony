import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { ProfileTileHeader } from './ProfileTileHeader';
import { ChangeEvent, FocusEvent } from 'react';
import { LabelledTextField } from '../common/LabelledTextField';
import PersonIcon from '@/assets/images/icon_person.svg';
import { User } from '@/src/models/Authentication';

type Props = {
  userProfile: User;
  isEdit?: boolean; // Optional prop to control edit state
  values?: any; // Formik values if needed
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

export const AboutYourSelf = ({ userProfile, touched, errors, handleChange, handleBlur, values, isEdit, ...props }: Props) => {
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
      {!isEdit && (
        <>
          <ProfileTileHeader title="About Yourself" />
          <Text font="heading" size="normal">
            {userProfile.profile.aboutMe}
          </Text>
        </>

      )}
      {isEdit && (
        <YStack gap={'$6'} width="100%">
          {/* Full Name */}
          <YStack gap={'$2'}>
            <LabelledTextField
              label="About Yourself"
              placeholder="Enter Your Full Name"
              // icon={<PersonIcon />}
              onChangeText={handleChange?.('aboutMe')}
              onBlur={handleBlur?.('aboutMe')}
              multiline={true}
              numberOfLines={4}
              value={values?.aboutMe ?? ''}
            />
            {touched?.aboutMe && errors?.aboutMe && (
              <Text theme={'error_message'}>{errors.aboutMe}</Text>
            )}
          </YStack>
        </YStack>
      )}
    </YStack>
  );
};
