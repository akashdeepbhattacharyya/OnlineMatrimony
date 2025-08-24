import { TouchableOpacity } from 'react-native';
import Back from '@/assets/images/back.svg';
import { ViewProps, XStack } from 'tamagui';
import { Text } from './Text';
import NotificationIcon from '@/assets/images/icon_notification.svg';
import { useAppSelector } from '@/services/store/hook';
import { ProfilePicture } from '../profile/ProfilePicture';
import GhostView from './GhostView';
import { router } from 'expo-router';

type Props = {
  headerText?: string;
  screenType?: 'default' | 'tab' | 'onboarding';
} & ViewProps;

const Header = ({ headerText, screenType = 'default', ...props }: Props) => {
  const { userProfile } = useAppSelector(state => state.user);

  const handelBack = () => {
    router.back();
  };

  const onProfilePress = () => {
    router.push({ pathname: '/(app)/(profile)' });
  };

  const onNotificationPress = () => {
    // Handle notification press
    console.log('Notification pressed');
  };

  return (
    <XStack
      justifyContent={screenType === 'onboarding' ? 'center' : 'space-between'}
      alignItems="center"
      paddingVertical={'$3'}
      paddingHorizontal={'$4'}
      {...props}
    >
      {screenType === 'default' && (
        <TouchableOpacity onPress={handelBack}>
          <Back width={20} height={20} />
        </TouchableOpacity>
      )}
      <Text
        font="heading"
        size="normal"
        textAlign={screenType === 'tab' ? 'left' : 'center'}
      >
        {headerText}
      </Text>
      {screenType === 'tab' && (
        <XStack alignItems="center" justifyContent="center" gap={'$3.5'}>
          <TouchableOpacity onPress={onProfilePress}>
            <ProfilePicture
              uri={
                userProfile.primaryPhotoUrl ||
                `https://ui-avatars.com/api/?name=${userProfile.fullName}&size=512`
              }
              outerCircleSize={38}
              innerCircleSize={32}
              imageSize={26}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={onNotificationPress}>
            <NotificationIcon width={38} height={38} />
          </TouchableOpacity> */}
        </XStack>
      )}
      {screenType === 'default' && <GhostView width={20} height={20} />}
    </XStack>
  );
};

export default Header;
export type HeaderProps = Props;
