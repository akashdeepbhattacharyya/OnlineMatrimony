import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import SearchIcon from '@/assets/images/search.svg';
import FilterIcon from '@/assets/images/filter.svg';
import { TabHeader } from '@/src/components/common/TabHeader';
import { fetchSearchUser } from '@/src/services/slices/search-slice';
import { useAppDispatch, useAppSelector } from '@/src/services/store/hook';
import { useLoader } from '@/src/context/LoaderContext';
import { useSearchUserRepository } from '@/src/api/repositories/useSearchRepository';
import { ScrollView, XStack, YStack, Image } from 'tamagui';
import { Input } from '@/src/components/common/Input';
import { Text } from '@/src/components/common/Text';
import VerifiedIcon from '@/assets/images/verified.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { useAuth } from '@/src/context/AuthContext';
import { SearchUser } from '@/src/models/User';

export default function SearchScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const { userSearchData } = useAppSelector(
    state => state.searchSlice,
  );
  const [filteredData, setFilteredData] = useState<SearchUser[]>(userSearchData);
  const { user } = useAuth();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onFilterPress = () => {
    navigation.navigate('PartnerPreference', {
      data: { purpose: 'UPDATE' },
    });
  };

  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();
  const userRepository = useSearchUserRepository();
  useEffect(() => {
    showLoader();
    dispatch(
      fetchSearchUser({
        getSearchUser: userRepository.getSearchUser,
        data: user?.preference || {},
      }),
    );
    hideLoader();
  }, []);
  const handelSearchQueryChange = (text: string) => {
    setSearchQuery(text);
    const data = userSearchData.filter(user => {
      return user.fullName.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(data);
  };

  // const storedToken = await getItem('TOKEN');
  // console.log(storedToken)
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
            onChangeText={handelSearchQueryChange}
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
          {filteredData.map(user => (
            <XStack
              key={user.id}
              alignItems="center"
              padding={'$1.5'}
              backgroundColor={'$color.black'}
              borderRadius={'$8'}
              gap={'$2'}
            >
              <Image
                source={user.photoUrls.length > 0 ? user.photoUrls[0] : require('../../../assets/images/logo.png')}
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
                  marginTop={'$3'}
                >{`${user.age || 0} Yrs Old, Height - ${user.height || 0}`}</Text>
                <Text font="heading" color={'$text'} size={'extra_small'}>
                  {`${user.religion || ''}`}
                </Text>
                <Text font="heading" color={'$text'} size={'extra_small'}>
                  {`${user.city ? user.city + ', ' : ''}${user.state ? user.state + ', ' : ''}${user.country ? user.country : ''}`}
                </Text>
                <XStack alignItems="center" gap="$2">
                  <Text font="heading" color={'$text'} size={'extra_small'}>
                    {`Verified`}
                  </Text>
                  <VerifiedIcon />
                </XStack>
              </YStack>
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
