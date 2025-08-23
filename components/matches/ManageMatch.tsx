import { Button, ViewProps, XStack } from 'tamagui';
import RejectIcon from '@/assets/images/match-dislike.svg';
import AcceptIcon from '@/assets/images/match-like.svg';

type Props = {
  onAccept: () => void;
  onReject: () => void;
} & ViewProps;

export const ManageMatch = ({ onAccept, onReject, ...props }: Props) => {
  return (
    <XStack
      {...props}
      gap="$4"
      justifyContent="center"
      height={66}
      width={'100%'}
      zIndex={1}
    >
      <Button onPress={onReject} width={66} height={66} borderRadius={33}>
        <RejectIcon />
      </Button>
      <Button onPress={onAccept} width={66} height={66} borderRadius={33}>
        <AcceptIcon />
      </Button>
    </XStack>
  );
};
