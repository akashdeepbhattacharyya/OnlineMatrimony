import { LinearGradient } from "expo-linear-gradient";
import { getToken, Image, View } from "tamagui";

type Props = {
  endLocation?: number;
}

export const Background = ({ endLocation = 0.4 }: Props) => {
  return (
    <>
      <Image source={require('@/assets/images/background.png')} width={"100%"} height={"100%"} position="absolute" objectFit="cover" />
      <LinearGradient
        colors={[
          getToken('$color.transparent'),
          getToken('$color.black'),
        ]}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        locations={[0, endLocation]}
      />
    </>
  );
};