import { ImageSourcePropType } from 'react-native';
import { View, Image, YStack, ViewProps } from 'tamagui';
import OuterCircle from '@/assets/images/profile-image-circle-outer.svg';
import InnerCircle from '@/assets/images/profile-image-circle-inner.svg';

type Props = {
  profilePicture?: ImageSourcePropType;
} & ViewProps;

export const ProfilePicture = ({ profilePicture, ...props }: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <YStack position="absolute">
        <OuterCircle />
      </YStack>
      <YStack position="absolute" marginTop={6} marginRight={12}>
        <InnerCircle />
      </YStack>
      <View
        width={94}
        height={94}
        borderRadius={50}
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        backgroundColor={'blue'}
        marginTop={14.5}
        marginLeft={2}
      >
        {profilePicture && (
          <Image source={profilePicture} width={94} height={94} />
        )}
      </View>
    </YStack>
  );
};
