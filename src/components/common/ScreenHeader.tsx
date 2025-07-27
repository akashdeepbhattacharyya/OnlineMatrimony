import { StyleSheet, TouchableOpacity } from 'react-native';
import Back from '../../../assets/images/back.svg';
import { useNavigation } from '@react-navigation/native';
import { View, ViewProps, XStack, Image } from 'tamagui';
import { Text } from './Text';
import NotificationIcon from '@/assets/images/icon_notification.svg';
import { accountStateItem } from '@/src/services/repositories/slices/userSlice';
import { useAppSelector } from '@/src/services/repositories/store/hook';
import { ProfilePicture } from '../profile/ProfilePicture';

type Props = {
  headerText?: string;
  isBack?: boolean;
  onProfiilePress?: () => void;
  onNotificationPress?: () => void;
} & ViewProps;

const Header = ({
  headerText,
  isBack = false,
  onProfiilePress,
  onNotificationPress,
  ...props
}: Props) => {
  const navigation = useNavigation();
  const { userData } = useAppSelector(accountStateItem);

  const handelBack = () => {
    navigation.goBack();
  };

  return (
    <XStack
      justifyContent="center"
      alignItems="center"
      paddingVertical={'$2'}
      paddingLeft="$2"
      paddingRight={'$3'}
      gap={'$3.5'}
      {...props}
    >
      {isBack && (
        <TouchableOpacity onPress={handelBack}>
          <Back width={20} height={20} />
        </TouchableOpacity>
      )}
      <Text
        font="heading"
        size="normal"
        width={'100%'}
        flexShrink={1}
        marginLeft={'$3'}
      >
        {headerText}
      </Text>
      <XStack alignItems="center" justifyContent="center" gap={'$3.5'}>
        <TouchableOpacity onPress={onProfiilePress}>
          <ProfilePicture
            uri={
              userData.profile.primaryPhotoUrl ||
              `https://ui-avatars.com/api/?name=${userData.profile.fullName}&size=512`
            }
            outerCircleSize={38}
            innerCircleSize={32}
            imageSize={26}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotificationPress}>
          <NotificationIcon width={38} height={38} />
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 500,
    fontFamily: 'Roboto-Medium',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // marginRight: 12,
  },
  notificationContainer: {
    position: 'relative',
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff00',
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default Header;
