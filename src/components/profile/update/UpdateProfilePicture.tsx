import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { ProfilePicture } from '../ProfilePicture';
import { View, ViewProps } from 'tamagui';
import CameraIcon from '@/assets/images/icon-camera.svg';

type Props = {
  profilePicture?: ImageSourcePropType;
  onPress: () => void;
} & ViewProps;

export const UpdateProfilePicture = ({
  profilePicture,
  onPress,
  ...props
}: Props) => {
  return (
    <View alignItems="center" {...props}>
      <ProfilePicture
        profilePicture={profilePicture}
        onPress={onPress}
        position="absolute"
      />
      <TouchableOpacity role="button" onPress={onPress}>
        <CameraIcon style={{ marginTop: 80, marginLeft: 80 }} />
      </TouchableOpacity>
    </View>
  );
};
