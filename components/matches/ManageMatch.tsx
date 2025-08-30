import { Button, ViewProps, XStack } from 'tamagui';
import RejectIcon from '@/assets/images/match-dislike.svg';
import AcceptIcon from '@/assets/images/match-like.svg';

type Props = {
  onAccept?: () => void;
  onReject?: () => void;
  hideAcceptButton?: boolean;
  hideRejectButton?: boolean;
} & ViewProps;

export const ManageMatch = ({ onAccept, onReject, hideAcceptButton = false, hideRejectButton = false, ...props }: Props) => {
  return (
    <XStack
      {...props}
      gap="$4"
      justifyContent="center"
      height={66}
      width={'100%'}
      zIndex={1}
    >
      {(!hideRejectButton && (
        <Button onPress={onReject} width={66} height={66} borderRadius={33}>
          <RejectIcon />
        </Button>
      ))}
      {(!hideAcceptButton && (
        <Button onPress={onAccept} width={66} height={66} borderRadius={33}>
          <AcceptIcon />
        </Button>
      ))}
    </XStack>
  );
};
