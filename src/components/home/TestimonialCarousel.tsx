import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View, XStack, YStack, Image, getToken } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import TestimonialBlob from '@/assets/images/testimonial.svg';

const { width } = Dimensions.get('window');

const testimonialData = [
  {
    id: '1',
    tips: `Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A Piece Of Classical Latin Literature From 45 BC, Making It Over 2000 Years Old. Richard McClintock, A Latin Professor At Hampden-Sydney College In Virginia, Looked Up One Of The More Obscure Latin Words, Consectetur, From A Lorem Ipsum Passage.`,
    image: require('../../../assets/images/couple.png'),
    name: 'Bijoy & Nikita',
    title: 'Newly Married Couple',
  },
  {
    id: '2',
    tips: `Lorem Ipsum has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
    image: require('../../../assets/images/couple.png'),
    name: 'Amit & Riya',
    title: 'Happy Couple',
  },
];

const TestimonialCarousel = () => {
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % testimonialData.length;
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + testimonialData.length) % testimonialData.length;
    scrollToIndex(prevIndex);
  };

  const renderItem = ({ item }: any) => (
    <YStack
      theme={'home_tiles'}
      width={width * 0.7}
      padding={'$6'}
      gap={'$4'}
      alignItems="center"
      backgroundColor={'$background'}
      borderRadius={'$8'}
      justifyContent="center"
      position="relative"
      marginHorizontal={'$2'}
    >
      <TestimonialBlob />
      <Text
        font="headingBold"
        textAlign="center"
        size={'small'}
        letterSpacing={0.5}
      >
        {item.tips}
      </Text>
      <Image source={item.image} width={70} height={70} borderRadius={35} />
      <YStack alignItems="center" gap={'$1.5'}>
        <Text font="heading" color={'$buttonTitle'}>
          {item.name}
        </Text>
        <Text font="heading">{item.title}</Text>
      </YStack>
    </YStack>
  );

  return (
    <View theme={'home_tiles'} marginBottom={200}>
      <View paddingHorizontal={'$9'}>
        <FlatList
          ref={flatListRef}
          data={testimonialData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(newIndex);
          }}
        />
      </View>
      <XStack
        height={'100%'}
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={20}
        right={20}
        paddingHorizontal={'$2'}
      >
        <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
          <Feather
            name="chevron-left"
            size={24}
            color={getToken('$color.white')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
          <Feather
            name="chevron-right"
            size={24}
            color={getToken('$color.white')}
          />
        </TouchableOpacity>
      </XStack>
    </View>
  );
};

export default TestimonialCarousel;

const styles = StyleSheet.create({
  arrowLeft: {
    backgroundColor: getToken('$color.gray_20'),
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  arrowRight: {
    backgroundColor: getToken('$color.gray_20'),
    borderRadius: 20,
    padding: 10,
  },
});
