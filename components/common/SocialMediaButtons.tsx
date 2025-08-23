import { XStack, type ViewProps } from 'tamagui';
import { FacebookButton } from './FacebookButton';
import { GoogleButton } from './GoogleButton';

type Props = {
  onGoogle: () => void;
  onFacebook: () => void;
} & ViewProps;

export const SocialMediaButtons = ({
  onGoogle,
  onFacebook,
  ...props
}: Props) => {
  return (
    <XStack gap="$4" justifyContent="center" alignItems="center" {...props}>
      <GoogleButton onPress={onGoogle} />
      <FacebookButton onPress={onFacebook} />
    </XStack>
  );
};
