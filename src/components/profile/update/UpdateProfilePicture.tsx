import { TouchableOpacity } from 'react-native';
import { ProfilePicture } from '../ProfilePicture';
import { View, ViewProps } from 'tamagui';
import CameraIcon from '@/assets/images/icon-camera.svg';

type Props = {
  uri?: string;
  onPress: () => void;
} & ViewProps;

export const UpdateProfilePicture = ({ uri, onPress, ...props }: Props) => {
  return (
    <View alignItems="center" justifyContent="center" {...props}>
      <ProfilePicture uri={uri} onPress={onPress} position="absolute" />
      <TouchableOpacity role="button" onPress={onPress}>
        <CameraIcon style={{ marginTop: 80, marginLeft: 80 }} />
      </TouchableOpacity>
    </View>
  );
};
