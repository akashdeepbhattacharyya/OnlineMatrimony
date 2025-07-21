import { CircularButton } from "./CircularButton";
import FacebookIcon from '../../../assets/images/facebook.svg';

type Props = {
  onPress: () => void;
};

export const FacebookButton = ({
  onPress,
  ...props
}: Props) => {
  return (
    <CircularButton icon={<FacebookIcon />} size={67} onPress={onPress} {...props} />
  )
}
