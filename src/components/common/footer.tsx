import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Text } from './Text';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, NavigationProp } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { getToken, View, YStack } from 'tamagui';
import { tabItems } from '@/src/resources/tab-item';
import { LinearGradient } from 'expo-linear-gradient';
import { ManageMatch } from '../navigation/ManageMatch';
import { useAppSelector } from '@/src/services/store/hook';
import { emitFooterEvent } from '@/src/hooks/useFooterEvent';
import MatchesIcon from '@/assets/images/tab-icon-matches.svg';
import HomeIcon from '@/assets/images/tab-icon-home.svg';
import SearchIcon from '@/assets/images/tab-icon-search.svg';
import SettingsIcon from '@/assets/images/tab-icon-settings.svg';
import ChatIcon from '@/assets/images/tab-icon-chat.svg';

const { width } = Dimensions.get('window');
const tabWidth = width / 5;

type RootNavigatorProps = { currentRoute: string };

const FooterNavigator = ({ currentRoute }: RootNavigatorProps) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { pendingMatches } = useAppSelector(state => state.match);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const handleNavigation = (item: (typeof tabItems)[0], i: number) => {
    setActiveTab(item.key);
    const index = tabItems.findIndex(i => i.key === item.key);
    setActiveIndex(index);
    navigation.navigate({
      name: item.route as keyof RootStackParamList,
    } as any);
  };

  const getPathWithDip = (index: number) => {
    const dipWidth = 155; // wider
    const dipHeight = 52; // deeper
    const edgeSmoothness = 42; // how fat/rounded the sides are

    const centerX = tabWidth * index + tabWidth / 2;
    const left = centerX - dipWidth / 2;
    const right = centerX + dipWidth / 2;

    return `
    M0 0
    H${left}
    C${left + edgeSmoothness} 0, ${
      centerX - edgeSmoothness
    } ${dipHeight}, ${centerX} ${dipHeight}
    C${centerX + edgeSmoothness} ${dipHeight}, ${
      right - edgeSmoothness
    } 0, ${right} 0
    H${width}
    V80
    H0
    Z
  `;
  };

  return (
    <View style={styles.absoluteBottom}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#2D152A00', '#000000']}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Floating ManageMatch Component */}
      {/* {activeIndex === 1 && pendingMatches.length > 0 && (
        <ManageMatch
          onAccept={() => {
            emitFooterEvent('ACCEPT_MATCH');
          }}
          onReject={() => {
            emitFooterEvent('REJECT_MATCH');
          }}
        />
      )} */}

      {/* Dynamic Curved Background */}
      {/* <Svg
        width={width}
        height={80}
        viewBox={`0 0 ${width} 80`}
        style={[StyleSheet.absoluteFill, {}, { top: 102 }]}
      >
        <Path d={getPathWithDip(activeIndex)} fill="#696969" />
      </Svg> */}
      <View
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          bottom: 0,
          height: 82,
          backgroundColor: getToken('$color.primary'),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />

      {/* Floating Icon */}
      {/* <Animated.View
        style={[styles.indicator, { transform: [{ translateX }] }]}
      >
        <View style={styles.circleIcon}>
          <Svg width={35} height={35} viewBox="0 0 35 35" fill="#ffffff">
            {tabItems[activeIndex]?.icon}
          </Svg>
        </View>
      </Animated.View> */}

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabItems.map((item, index) => {
          const isActive = activeTab === item.key;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigation(item, index)}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <YStack gap={'$1.5'} marginBottom={15} alignItems="center">
                {item.key === 'Home' && (
                  <HomeIcon
                    color={
                      isActive
                        ? getToken('$color.button_bg_red')
                        : getToken('$color.gray_lighter')
                    }
                  />
                )}
                {item.key === 'Matches' && (
                  <MatchesIcon
                    color={
                      isActive
                        ? getToken('$color.button_bg_red')
                        : getToken('$color.gray_lighter')
                    }
                  />
                )}
                {item.key === 'Chat' && (
                  <ChatIcon
                    color={
                      isActive
                        ? getToken('$color.button_bg_red')
                        : getToken('$color.gray_lighter')
                    }
                  />
                )}
                {item.key === 'Search' && (
                  <SearchIcon
                    color={
                      isActive
                        ? getToken('$color.button_bg_red')
                        : getToken('$color.gray_lighter')
                    }
                  />
                )}
                {item.key === 'Settings' && (
                  <SettingsIcon
                    color={
                      isActive
                        ? getToken('$color.button_bg_red')
                        : getToken('$color.gray_lighter')
                    }
                  />
                )}
                <Text
                  font="heading"
                  size="extra_small"
                  color={
                    isActive
                      ? getToken('$color.button_bg_red')
                      : getToken('$color.gray_lighter')
                  }
                >
                  {item.label}
                </Text>
              </YStack>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FooterNavigator;

const styles = StyleSheet.create({
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 182,
  },
  tabRow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: tabWidth,
  },
  tabLabel: {
    fontSize: 11,
    color: '#A9A9A9',
    marginTop: 2,
  },
  indicator: {
    position: 'absolute',
    top: 80,
    width: tabWidth,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 20,
  },
  circleIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#F85F5F',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
