import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Play from '../../../assets/images/play.svg';
import { testimonialData } from '../../interface/home';

const testiMonial: testimonialData[] = [
    {
        id: '1',
        tips: 'Pro Tips for Amazing First Impressions',
        image: require('../../../assets/images/backgrounImg.png'),
        play: true,
        thumbnail: require('../../../assets/images/backgrounImg.png'),
    },
    {
        id: '2',
        tips: 'Pro Tips for Amazing First Impressions',
        image: require('../../../assets/images/backgrounImg.png'),
        play: true,
        thumbnail: require('../../../assets/images/backgrounImg.png'),
    },
    {
        id: '3',
        tips: 'Pro Tips for Amazing First Impressions',
        image: require('../../../assets/images/backgrounImg.png'),
        play: true,
        thumbnail: require('../../../assets/images/backgrounImg.png')
    },
];

const Testimonial = () => {
    const [isPlaying, setIsPlaying] = useState<boolean[]>(
        new Array(testiMonial.length).fill(false)
    );

    const handlePlay = (index: number) => {
        const updatedPlaying = isPlaying.map((_, i) => i === index);
        setIsPlaying(updatedPlaying);
    };

    const renderItem = ({ item, index }: { item: testimonialData, index: number }) => (
        <View style={styles.card}>
            {isPlaying[index] ? (
                <Video
                    source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
                    style={styles.video}
                    resizeMode="cover"
                    paused={false}
                    muted
                />
            ) : (
                <ImageBackground source={item.image} style={styles.image} resizeMode='cover'>
                    <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.tips}</Text>
                        <TouchableOpacity onPress={() => handlePlay(index)} style={styles.playIcon}>
                            <Play width={50} height={50} fill="white" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Tips & Testimonial</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={testiMonial}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default Testimonial;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#fff',
        borderBottomWidth: 0.8,
        borderStyle: 'dotted',
        marginBottom: 10,
        paddingBottom: 6,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 700,
        fontFamily: 'Roboto-Medium',
    },
    seeAll: {
        color: '#F85F5F',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Roboto-Medium',
    },
    listContainer: {
        paddingVertical: 5,
    },
    card: {
        backgroundColor: '#000',
        borderRadius: 25,
        marginRight: 15,
        width: 400,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    video: {
        width: '100%',
        height: 250,
        borderRadius: 25,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 250,
        justifyContent: 'flex-end',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },

    playIconContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -32 }, { translateY: -32 }],
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        marginLeft: 40
    },

    name: {
        fontWeight: 500,
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        flex: 1, // Makes the text take remaining space
    },
    playIcon: {
        marginHorizontal: 20,
    },
});
