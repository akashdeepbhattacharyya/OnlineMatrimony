import { MatchedUserProfile } from '@/models/Match';
import { Text } from '../common/Text';
import { Button, getToken, Image, View, XStack, YStack } from 'tamagui';
import CameraBlob from '@/assets/images/camera.svg';
import MenuBlob from '@/assets/images/menu.svg';
import VerifiedBlob from '@/assets/images/verified.svg';
import { toFeetAndInches, toUri } from '@/utils/utils';
import { cities, states } from '@/resources/city-state';
import { Dimensions } from 'react-native';
import { occupations } from '@/resources/occupation';
import { religions } from '@/resources/religion';
import { castes, subCastes } from '@/resources/caste';
import { UserProfile } from '@/models/User';

type Props = {
  userProfile: UserProfile;
};

export const ProfilePicture = ({ userProfile }: Props) => {
  const { height } = Dimensions.get('window');
  return (
    <View height={height * 0.55}>
      <Image
        source={{
          uri: toUri(
            userProfile.fullName,
            userProfile.primaryPhotoUrl,
          ),
        }}
        width={'100%'}
        height={'100%'}
        borderTopRightRadius={'$8'}
        borderBottomLeftRadius={'$8'}
        borderBottomRightRadius={'$8'}
        borderTopLeftRadius={'$8'}
        objectFit="cover"
        position="absolute"
      />
      <YStack
        paddingLeft={'$4'}
        paddingTop={'$2'}
        paddingRight={'$2'}
        paddingBottom={'$4'}
        justifyContent="space-between"
        height={'100%'}
      >
        <XStack justifyContent="flex-end">
          {/* <YStack alignItems="flex-end" gap={'$2'}>
            <Button width={'$5'} height={'$3'} borderRadius={'$7'}>
              <CameraBlob />
            </Button>
            <Button width={'$3'} height={'$3'} borderRadius={'$7'}>
              <MenuBlob />
            </Button>
          </YStack> */}
        </XStack>
        <YStack
          shadowColor={getToken('$color.black')}
          shadowOffset={{ width: 0, height: 5 }}
          shadowRadius={10}
        >
          <XStack alignItems="center" gap={'$2'}>
            <Text font="headingBold" size="extra_large">
              {userProfile.fullName}
            </Text>
            <VerifiedBlob />
          </XStack>
          <Text font="heading" size="normal">
            {[
              [userProfile.age, 'yrs'].join(' '),
              toFeetAndInches(userProfile.height),
              occupations[
              userProfile.occupation as keyof typeof occupations
              ],
            ].join('  ')}
          </Text>
          <Text font="heading" size="small">
            {[
              religions[userProfile.religion as keyof typeof religions],
              castes[userProfile.caste as keyof typeof castes],
              subCastes[userProfile.subCaste as keyof typeof subCastes],
              cities[userProfile.city as keyof typeof cities],
              states[userProfile.state as keyof typeof states],
            ]
              .filter(Boolean)
              .join(', ')}
          </Text>
        </YStack>
      </YStack>
    </View>
  );
};
