import { Image, YStack, ViewProps } from 'tamagui';
import OuterCircle from '@/assets/images/profile-image-circle-outer.svg';
import InnerCircle from '@/assets/images/profile-image-circle-inner.svg';

type SizeProps = {
  innerCircleSize?: number;
  outerCircleSize?: number;
  imageSize?: number;
};

type Props = {
  uri?: string;
} & SizeProps &
  ViewProps;

export const ProfilePicture = ({
  uri,
  innerCircleSize = 111,
  outerCircleSize = 123,
  imageSize = 94,
  ...props
}: Props) => {
  return (
    <YStack alignItems="center" justifyContent="center" {...props}>
      <YStack position="absolute">
        <OuterCircle width={outerCircleSize} height={outerCircleSize} />
      </YStack>
      <YStack position="absolute">
        <InnerCircle width={innerCircleSize} height={innerCircleSize} />
      </YStack>
      <Image
        source={{ uri }}
        width={imageSize}
        height={imageSize}
        borderRadius={imageSize / 2}
      />
    </YStack>
  );
};
