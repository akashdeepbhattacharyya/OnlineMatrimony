import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { Text } from './Text';
import Svg, { Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import {
  useNavigation,
  NavigationProp,
  useNavigationState,
} from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { getToken, YStack } from 'tamagui';
import { tabItems } from '@/src/resources/tab-item';

const { width } = Dimensions.get('window');
const tabWidth = width / 5;

type RootNavigatorProps = { currentRoute: string };

const FooterNavigator = ({ currentRoute }: RootNavigatorProps) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const index = tabItems.findIndex(item => item.key === currentRoute);
    setActiveTab(currentRoute);
    setActiveIndex(index >= 0 ? index : 0);
  }, [currentRoute]);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const handleNavigation = (item: (typeof tabItems)[0]) => {
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
      {/* Dynamic Curved Background */}
      <Svg
        width={width}
        height={80}
        viewBox={`0 0 ${width} 80`}
        style={[StyleSheet.absoluteFill, {}]}
      >
        <Path
          d={getPathWithDip(activeIndex)}
          fill={getToken('$color.gray_darker')}
        />
      </Svg>

      {/* Floating Icon */}
      <Animated.View
        style={[styles.indicator, { transform: [{ translateX }] }]}
      >
        <View style={styles.circleIcon}>
          <Svg
            width={35}
            height={35}
            viewBox="0 0 35 35"
            fill={getToken('$color.white')}
          >
            {tabItems[activeIndex]?.icon}
          </Svg>
        </View>
      </Animated.View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabItems.map((item, index) => {
          const isActive = activeTab === item.key;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigation(item)}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <YStack gap={'$1.5'} marginBottom={5} alignItems="center">
                {isActive ? null : (
                  <Svg
                    opacity={0.6}
                    style={{
                      height: 20,
                      width: 20,
                      scaleX: 0.6,
                      scaleY: 0.6,
                    }}
                  >
                    {item.icon}
                  </Svg>
                )}
                {!isActive && (
                  <Text
                    font="heading"
                    size="extra_small"
                    color={getToken('$color.gray')}
                  >
                    {item.label}
                  </Text>
                )}
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
    height: 80,
    zIndex: 10,
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
    color: '#aaa',
    marginTop: 2,
  },
  indicator: {
    position: 'absolute',
    top: -30,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
