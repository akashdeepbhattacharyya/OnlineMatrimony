import { MatchedUserProfile } from '@/models/Match';
import { Text } from '../../common/Text';
import { Button, getToken, Image, View, XStack, YStack } from 'tamagui';
import CameraBlob from '@/assets/images/camera.svg';
import MenuBlob from '@/assets/images/menu.svg';
import VerifiedBlob from '@/assets/images/verified.svg';
import { toAge, toFeetAndInches, toUri } from '@/utils/utils';
import { cities, states } from '@/resources/city-state';
import { Dimensions } from 'react-native';
import { Occupation, occupations } from '@/resources/occupation';
import { religions } from '@/resources/religion';
import { castes } from '@/resources/caste';

type Props = {
  matchedUserProfile: MatchedUserProfile;
};

export const MatchProfilePicture = ({ matchedUserProfile }: Props) => {
  const { height } = Dimensions.get('window');
  return (
    <View height={height * 0.55}>
      <Image
        source={{
          uri: toUri(
            matchedUserProfile.fullName,
            matchedUserProfile.primaryPhotoUrl,
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
              {matchedUserProfile.fullName}
            </Text>
            <VerifiedBlob />
          </XStack>
          <Text font="heading" size="normal">
            {[
              [matchedUserProfile.age, 'yrs'].join(' '),
              toFeetAndInches(matchedUserProfile.height),
              occupations[
              matchedUserProfile.occupation as keyof typeof occupations
              ],
            ].join('  ')}
          </Text>
          <Text font="heading" size="small">
            {[
              religions[matchedUserProfile.religion as keyof typeof religions],
              castes[matchedUserProfile.caste as keyof typeof castes],
              cities[matchedUserProfile.city as keyof typeof cities],
              states[matchedUserProfile.state as keyof typeof states],
            ]
              .filter(Boolean)
              .join(', ')}
          </Text>
        </YStack>
      </YStack>
    </View>
  );
};
