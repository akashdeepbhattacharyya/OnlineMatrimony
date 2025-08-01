import { YStack, ViewProps } from 'tamagui';
import { ProfileTileHeader } from '../../common/ProfileTileHeader';
import { UpdateUserProfileFormType } from '@/src/resources/form';
import { useFormikContext } from 'formik';
import { TextArea } from '../../common/TextArea';

export const UpdateAboutYourSelf = ({ ...props }: ViewProps) => {
  const { values, handleChange, handleBlur } =
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
        placeholder="Tell us about yourself"
        padding="$4"
        font="heading"
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
