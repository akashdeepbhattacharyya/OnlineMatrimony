import { getToken, Image } from 'tamagui';

import LinearGradient from 'react-native-linear-gradient';
import { ImageSourcePropType } from 'react-native';

type Props = {
  image?: ImageSourcePropType;
};

export const ProfileBackground = ({ image }: Props) => {
  return (
    <>
      <Image source={image} position="absolute" objectFit="cover" />
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
