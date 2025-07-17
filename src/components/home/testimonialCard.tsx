import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

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
    const prevIndex = (currentIndex - 1 + testimonialData.length) % testimonialData.length;
    scrollToIndex(prevIndex);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Icon name="format-quote" size={48} color="#fff" style={styles.quoteIcon} />
      <Text style={styles.message}>{item.tips}</Text>
      <View style={styles.footer}>
        <Image source={item.image} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ position: 'relative', marginVertical: 10 }}>
      <FlatList
        ref={flatListRef}
        data={testimonialData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />

      <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
        <Feather name="chevron-left" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
        <Feather name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TestimonialCarousel;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    padding: 20,
    width: width - 80,
    marginHorizontal: 40,
    alignItems: 'center',
  },
  quoteIcon: {
    marginBottom: 10,
    
  },
  message: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  name: {
    color: '#F85F5F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    color: '#ccc',
    fontSize: 12,
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '40%',
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '40%',
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
  },
});
