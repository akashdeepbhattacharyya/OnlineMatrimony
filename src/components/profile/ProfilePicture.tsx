import { ImageSourcePropType } from 'react-native';
import { View, Image, YStack, ViewProps } from 'tamagui';
import OuterCircle from '@/assets/images/profile-image-circle-outer.svg';
import InnerCircle from '@/assets/images/profile-image-circle-inner.svg';
import { User } from '@/src/models/User';

type Props = {
  userData: User;
} & ViewProps;

export const ProfilePicture = ({ userData, ...props }: Props) => {
  console.log('ProfilePicture userData:', userData);
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
        marginTop={14.5}
        marginLeft={2}
      >
        <Image
          source={{
            uri:
              userData.profile.primaryPhotoUrl ||
              `https://ui-avatars.com/api/?name=${userData.profile.fullName}`,
          }}
          width={94}
          height={94}
        />
      </View>
    </YStack>
  );
};
