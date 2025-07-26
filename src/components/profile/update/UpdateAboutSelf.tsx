import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { ProfileTileHeader } from '../ProfileTileHeader';
import { UpdateUserProfileFormType } from '@/src/resources/form';
import { useFormikContext } from 'formik';
import { LabelledTextArea } from '../../common/LabelledTextArea';
import { TextArea } from '../../common/TextArea';

export const UpdateAboutYourSelf = ({ ...props }: ViewProps) => {
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
      <ProfileTileHeader title="About Yourself" />
      <TextArea
        theme="text_area"
        padding="$4"
        font='heading'
        size="normal"
        borderRadius="$8"
        verticalAlign="top"
        onChangeText={handleChange('aboutMe')}
        onBlur={handleBlur('aboutMe')}
        value={values.aboutMe}
      />
    </YStack>
  );
};
