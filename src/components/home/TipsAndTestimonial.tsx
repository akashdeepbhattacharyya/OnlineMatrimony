import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';
import { Tip } from '../../interface/home';
import { Image, View, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import PlayIcon from '@/assets/images/icon_play.svg';
import { TileHeader } from '../common/TileHeader';

const { width, height } = Dimensions.get('window');

const testiMonial: Tip[] = [
  {
    id: '1',
    title: 'Pro Tips for Amazing First Impressions',
    image: require('../../../assets/images/backgrounImg.png'),
    play: true,
    thumbnail: require('../../../assets/images/backgrounImg.png'),
  },
  {
    id: '2',
    title: 'Pro Tips for Amazing First Impressions',
    image: require('../../../assets/images/backgrounImg.png'),
    play: true,
    thumbnail: require('../../../assets/images/backgrounImg.png'),
  },
  {
    id: '3',
    title: 'Pro Tips for Amazing First Impressions',
    image: require('../../../assets/images/backgrounImg.png'),
    play: true,
    thumbnail: require('../../../assets/images/backgrounImg.png'),
  },
];

const TipsAndTestimonial = ({ onRightButton }: { onRightButton: () => void }) => {
  const [isPlaying, setIsPlaying] = useState<boolean[]>(
    new Array(testiMonial.length).fill(false),
  );

  const handlePlay = (index: number) => {
    const updatedPlaying = isPlaying.map((_, i) => i === index);
    setIsPlaying(updatedPlaying);
  };

  const renderItem = ({ item, index }: { item: Tip; index: number }) => (
    <View borderRadius={'$10'} padding={'$1'} marginRight={'$3'}>
      {isPlaying[index] ? (
        <Video
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
          style={styles.video}
          shouldPlay={true}
          isLooping={false}
          isMuted={true}
          useNativeControls={false}
        />
      ) : (
        <View width={width * 0.7} height={height * 0.2} flex={1}>
          <Image
            source={item.image}
            width={width * 0.7}
            height={height * 0.2}
            objectFit="cover"
            borderRadius={25}
            position="absolute"
          />
          <View
            justifyContent="flex-end"
            height={'100%'}
            shadowColor={'$shadowColor'}
            shadowOffset={{ width: 0, height: 5 }}
            shadowRadius={10}
          >
            <XStack
              alignItems="center"
              paddingHorizontal={'$7'}
              paddingVertical={'$4'}
              justifyContent="center"
              gap={'$2'}
            >
              <Text font="headingBold" size="small">
                {item.title}
              </Text>

              <TouchableOpacity onPress={() => handlePlay(index)}>
                <PlayIcon width={28} height={28} />
              </TouchableOpacity>
            </XStack>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View theme={'home_tiles'} padding={'$4.5'}>
      <YStack
        gap={'$3'}
        backgroundColor={'$background'}
        padding={'$4'}
        borderRadius={'$8'}
      >
        <TileHeader
          title={`Tips & Testimonials`}
          rightButtonTitle="See All"
          onRightButton={onRightButton}
        />
        <FlatList
          data={testiMonial}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </YStack>
    </View>
  );
};

export default TipsAndTestimonial;

const styles = StyleSheet.create({
  video: {
    width: 264,
    height: 176,
    borderRadius: 25,
    overflow: 'hidden',
  },
});
