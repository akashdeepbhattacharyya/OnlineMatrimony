import { CircularButton } from "./CircularButton";
import GoogleIcon from '@/assets/images/google.svg';

type Props = {
  onPress: () => void;
};

export const GoogleButton = ({
  onPress,
  ...props
}: Props) => {
  return (
    <CircularButton icon={<GoogleIcon />} size={67} onPress={onPress} {...props} />
  )
}
