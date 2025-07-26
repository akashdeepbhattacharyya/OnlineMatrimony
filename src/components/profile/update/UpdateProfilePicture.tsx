import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { ProfilePicture } from '../ProfilePicture';
import { View, ViewProps } from 'tamagui';
import CameraIcon from '@/assets/images/icon-camera.svg';
import { User } from '@/src/models/User';

type Props = {
  userData: User;
  onPress: () => void;
} & ViewProps;

export const UpdateProfilePicture = ({
  userData,
  onPress,
  ...props
}: Props) => {
  return (
    <View alignItems="center" {...props}>
      <ProfilePicture
        userData={userData}
        onPress={onPress}
        position="absolute"
      />
      <TouchableOpacity role="button" onPress={onPress}>
        <CameraIcon style={{ marginTop: 80, marginLeft: 80 }} />
      </TouchableOpacity>
    </View>
  );
};
