import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import SearchIcon from '@/assets/images/search.svg';
import FilterIcon from '@/assets/images/filter.svg';
import { TabHeader } from '@/components/common/TabHeader';
import { fetchSearchUser } from '@/services/slices/search-slice';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { useSearchUserRepository } from '@/services/api/repositories/useSearchRepository';
import { ScrollView, XStack, YStack } from 'tamagui';
import { Input } from '@/components/common/Input';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SearchItem } from '@/components/search/SearchItem';
import { Text } from '@/components/common/Text';
import { router } from 'expo-router';

export default function Search() {
  const { userSearchData } = useAppSelector(
    state => state.searchSlice,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const searchUserRepository = useSearchUserRepository();

  const onFilterPress = () => {
    router.push({
      pathname: "/(app)/(settings)/partner-preferences",
      params: { purpose: 'UPDATE' },
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
