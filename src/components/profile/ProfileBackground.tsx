import { getToken, Image } from 'tamagui';
import LinearGradient from 'react-native-linear-gradient';
import { User } from '@/src/models/User';

type Props = {
  userData: User;
};

export const ProfileBackground = ({ userData }: Props) => {
  return (
    <>
      <Image
        source={{
          uri:
            userData.profile.primaryPhotoUrl ||
            `https://ui-avatars.com/api/?name=${userData.profile.fullName}`,
        }}
        position="absolute"
        objectFit="cover"
      />
      <LinearGradient
        colors={[
          getToken('$color.primary'),
          getToken('$color.red_80'),
          getToken('$color.primary'),
        ]}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        locations={[0, 0.6, 1]}
      />
    </>
  );
};
