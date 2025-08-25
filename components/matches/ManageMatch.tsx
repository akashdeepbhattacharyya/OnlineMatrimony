import { Button, ViewProps, XStack } from 'tamagui';
import RejectIcon from '@/assets/images/match-dislike.svg';
import AcceptIcon from '@/assets/images/match-like.svg';
import { Match } from '@/models/Match';

type Props = {
  match?: Match;
  onAccept: () => void;
  onReject: () => void;
} & ViewProps;

export const ManageMatch = ({ match, onAccept, onReject, ...props }: Props) => {
  return (
    <XStack
      {...props}
      gap="$4"
      justifyContent="center"
      height={66}
      width={'100%'}
      zIndex={1}
    >
      {(match?.matchStatus === 'PENDING' || match?.matchStatus === 'ACCEPTED') && (
        <Button onPress={onReject} width={66} height={66} borderRadius={33}>
          <RejectIcon />
        </Button>
      )}
      {(match?.matchStatus === 'PENDING' || match?.matchStatus === 'REJECTED') && (
        <Button width={66} height={66} borderRadius={33} disabled>
          <AcceptIcon />
        </Button>
      )}
    </XStack>
  );
};
