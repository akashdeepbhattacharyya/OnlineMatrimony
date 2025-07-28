import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/search/ProfileCard';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/common/ScreenHeader';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './style';
import { SheetC } from '@/src/components/common/Sheet';
import PersonalInfoScreen from '@/src/components/PersonalInfo/PersonalInfo';
import { useLoader } from '@/src/context/LoaderContext';
import { useAppDispatch, useAppSelector } from '@/src/services/repositories/store/hook';
import { fetchSearchData, searchStateItem } from '@/src/services/repositories/slices/matchSlice';
import { useMatchRepository } from '@/src/api/repositories/useMatchRepository';

export default function SearchScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();
  const userRepository = useMatchRepository();
  const { searchData } = useAppSelector(searchStateItem);;
  const users = [
    {
      id: '1',
      name: 'Kakali M',
      age: 40,
      height: '5’2″',
      religion: 'Hindu',
      location: 'New York, USA',
      photo: require('../../../assets/images/image.png'), // Replace with local or remote image
      isVerified: true,
      religionLabel: 'Indian, Hindu',
      isHighlighted: true,
    },
    {
      id: '2',
      name: 'Mohmec D',
      age: 44,
      height: '5’7″',
      religion: 'Christian',
      location: 'Kolkata, India',
      photo: require('../../../assets/images/image2.png'),
      isVerified: true,
      religionLabel: 'Indian, Christian',
    },
    {
      id: '3',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
    {
      id: '4',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
    {
      id: '5',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
    {
      id: '6',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
    {
      id: '7',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
    {
      id: '8',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
    {
      id: '9',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
    {
      id: '10',
      name: 'Sania M',
      age: 40,
      height: '5’2″',
      religion: 'Islam',
      location: 'New York, USA',
      photo: require('../../../assets/images/image4.png'),
      isVerified: true,
      religionLabel: 'Indian, Islam',
    },
  ];
  useEffect(() => {
    const getData = async () => {
      showLoader();
      await dispatch(fetchSearchData({ getSearches: userRepository.getSearches }));
      hideLoader();
    }
    getData();
  }, []);
  console.log('searchData', searchData);

  const handelSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView shouldRasterizeIOS={true} style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#2B2B2B"
          barStyle="default"
          showHideTransition="fade"
        />
        <Header headerText="Search" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <View style={{ flex: 1, position: 'relative', width: '100%' }}>
            <MaterialIcons
              name="search"
              size={20}
              color="white"
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: [{ translateY: -10 }],
                zIndex: 1,
              }}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity onPress={handelSearch} >
            <MaterialIcons name="tune" size={30} color="red" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={searchData.content}
          style={{ marginBottom: 90 }}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ProfileCard
              user={item}
              index={index}
              isSelected={index === selectedIndex}
              onSelect={() => setSelectedIndex(index)}
            />
          )}
        />
        <SheetC open={isOpenSearch} onOpenChange={setIsOpenSearch}>
          <PersonalInfoScreen />
          <TouchableOpacity onPress={() => setIsOpenSearch(!isOpenSearch)}><Text>Close</Text></TouchableOpacity>
        </SheetC>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
