import { castes, subCastes } from '@/resources/caste';
import { cities, states } from '@/resources/city-state';
import { occupations } from '@/resources/occupation';
import { religions } from '@/resources/religion';
import { toAge, toFeetAndInches, toUri } from '@/utils/utils';
import React from 'react';
import { XStack, Image, YStack } from 'tamagui';
import { Text } from '../common/Text';
import VerifiedIcon from '@/assets/images/verified.svg';
import { UserProfile } from '@/models/User';

type Props = {
  userProfile: UserProfile;
  onPress?: () => void;
};

export const MatchItem = ({ userProfile, onPress }: Props) => {
  return (
    <XStack
      theme={'match_item'}
      gap={'$2'}
      height={'$9'}
      onPress={onPress}
      backgroundColor={'$background'}
      borderRadius={'$4'}
    >
      <Image
        source={{
          uri: toUri(
            userProfile.fullName,
            userProfile.primaryPhotoUrl,
          ),
        }}
        width={'$7'}
        height={'$9'}
        borderTopRightRadius={'$4'}
        borderBottomLeftRadius={'$4'}
        borderBottomRightRadius={'$4'}
        borderTopLeftRadius={'$4'}
        objectFit="cover"
      />
      <YStack paddingVertical={'$4'} gap={'$2'}>
        <XStack gap={'$2'} alignItems="center">
          <Text font="headingBold" size="medium" color="$text">
            {userProfile.fullName}
          </Text>
          <VerifiedIcon />
        </XStack>
        <Text font="heading" size="small">
          {[
            [toAge(userProfile.dateOfBirth), 'yrs'].join(' '),
            toFeetAndInches(userProfile.height),
            occupations[
            userProfile.occupation as keyof typeof occupations
            ],
          ].join('  ')}
        </Text>
        <Text font="heading" size="extra_small">
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
    </XStack>
  );
};
