import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import SearchIcon from '@/assets/images/search.svg';
import FilterIcon from '@/assets/images/filter.svg';
import { TabHeader } from '@/src/components/common/TabHeader';
import { fetchSearchUser } from '@/src/services/slices/search-slice';
import { useAppDispatch, useAppSelector } from '@/src/services/store/hook';
import { useSearchUserRepository } from '@/src/api/repositories/useSearchRepository';
import { ScrollView, XStack, YStack } from 'tamagui';
import { Input } from '@/src/components/common/Input';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { SearchItem } from '@/src/components/search/SearchItem';
import { Text } from '@/src/components/common/Text';

export default function SearchScreen() {
  const { userSearchData } = useAppSelector(
    state => state.searchSlice,
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const searchUserRepository = useSearchUserRepository();

  const onFilterPress = () => {
    navigation.navigate('PartnerPreference', {
      data: { purpose: 'UPDATE' },
    });
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(
        fetchSearchUser({
          getSearchUser: searchUserRepository.getSearchUser,
          data: searchQuery,
        }),
      );
    }
  }, [searchQuery]);

  return (
    <Screen>
      <TabHeader headerText="Matches" />
      <XStack alignItems="center" gap={'$4'} padding={'$4'}>
        <XStack
          alignItems="center"
          paddingHorizontal={'$4'}
          backgroundColor={'$color.gray_darker'}
          borderRadius={'$10'}
          paddingVertical={'$0'}
          flex={1}
        >
          <SearchIcon />
          <Input
            placeholder="Search"
            placeholderTextColor={'$color.gray_lighter'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            color={"$color.white"}
          />
        </XStack>
        <TouchableOpacity onPress={onFilterPress}>
          <FilterIcon />
        </TouchableOpacity>
      </XStack>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack
          flex={1}
          marginBottom={'$19'}
          gap={'$3'}
          paddingHorizontal={'$4'}
        >
          {userSearchData.length === 0 && (
            <XStack
              justifyContent="center"
              alignItems="center"
              width={'100%'}
              height={'100%'}
            >
              <Text
                font="heading"
                size="large"
                color="$text"
                textAlign="center"
                padding={'$4'}
              >
                {`No users found. \nPlease try a different search query.`}
              </Text>
            </XStack>
          )}
          {userSearchData.map(user => (
            <SearchItem key={user.id} user={user} />
          ))}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
