import { XStack, Image, YStack } from "tamagui"
import { Text } from "../common/Text"
import VerifiedIcon from '@/assets/images/verified.svg';
import { SearchUser } from "@/models/User";
import { castes, subCastes } from "@/resources/caste";
import { religions } from "@/resources/religion";
import { cities, states } from "@/resources/city-state";
import { toFeetAndInches, toUri } from "@/utils/utils";

export const SearchItem = ({ user }: { user: SearchUser }) => {
  const casteAndReligion = [
    castes[user.caste as keyof typeof castes],
    subCastes[user.subCaste as keyof typeof subCastes],
    religions[user.religion as keyof typeof religions],
  ]
    .filter(Boolean)
    .join(', ')

  const address = [
    cities[user.city as keyof typeof cities],
    states[user.state as keyof typeof states],
  ]
    .filter(Boolean)
    .join(', ')

  const height = toFeetAndInches(user.height)

  return (
    <XStack
      alignItems="center"
      padding={'$1.5'}
      backgroundColor={'$color.black'}
      borderRadius={'$8'}
      gap={'$2'}
    >
      <Image
        source={{
          uri: toUri(
            user.fullName,
            user.primaryPhotoUrl,
          )
        }}
        width={'$13'}
        height={'$13'}
        padding={'$2'}
        borderTopLeftRadius={'$6'}
        borderTopRightRadius={'$6'}
        borderBottomLeftRadius={'$6'}
        borderBottomRightRadius={'$6'}
      />
      <YStack gap={'$2'}>
        <Text font="heading" color={'$text'} size={'medium'}>
          {user.fullName}
        </Text>
        <Text
          font="heading"
          color={'$text'}
          size={'extra_small'}
          marginTop={'$2'}
        >{`${user.age || 0} Yrs Old${height ? `, Height - ${height}` : ''}`}</Text>
        {casteAndReligion.length > 0 && (
          <Text font="heading" color={'$text'} size={'extra_small'}>
            {casteAndReligion}
          </Text>
        )}
        {address.length > 0 && (
          <Text font="heading" color={'$text'} size={'extra_small'}>
            {address}
          </Text>
        )}
        <XStack alignItems="center" gap="$2">
          <Text font="heading" color={'$text'} size={'extra_small'}>
            {`Verified`}
          </Text>
          <VerifiedIcon />
        </XStack>
      </YStack>
    </XStack>
  )
}