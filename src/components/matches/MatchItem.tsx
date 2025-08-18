import { Match } from '@/src/models/Match';
import { castes } from '@/src/resources/caste';
import { cities, states } from '@/src/resources/city-state';
import { occupations } from '@/src/resources/occupation';
import { religions } from '@/src/resources/religion';
import { toAge, toFeetAndInches, toUri } from '@/src/utils/utils';
import React from 'react';
import { XStack, Image, YStack } from 'tamagui';
import { Text } from '../common/Text';
import VerifiedIcon from '@/assets/images/verified.svg';

type Props = {
  match: Match;
  onPress?: () => void;
};

export const MatchItem = ({ match, onPress }: Props) => {
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
            match.profileResponse.fullName,
            match.profileResponse.primaryPhotoUrl,
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
            {match.profileResponse.fullName}
          </Text>
          <VerifiedIcon />
        </XStack>
        <Text font="heading" size="small">
          {[
            [toAge(match.profileResponse.dateOfBirth), 'yrs'].join(' '),
            toFeetAndInches(match.profileResponse.height),
            occupations[
              match.profileResponse.occupation as keyof typeof occupations
            ],
          ].join('  ')}
        </Text>
        <Text font="heading" size="extra_small">
          {[
            religions[match.profileResponse.religion as keyof typeof religions],
            castes[match.profileResponse.caste as keyof typeof castes],
            cities[match.profileResponse.city as keyof typeof cities],
            states[match.profileResponse.state as keyof typeof states],
          ]
            .filter(Boolean)
            .join(', ')}
        </Text>
      </YStack>
    </XStack>
  );
};
