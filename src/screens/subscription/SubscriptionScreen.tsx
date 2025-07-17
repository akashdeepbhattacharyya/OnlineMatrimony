import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    FlatList,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './style';
import Header from '../../components/common/header.component';
const subscriptionData = [
    {
        id: '1',
        title: 'Regular Plan',
        price: '₹1100',
        time: '11',
        features: ['Viewing extended match lists', 'Unlocking regular profiles information', 'Active chat limit: 6 accounts', '4 matches per week'],
    },
    {
        id: '2',
        title: 'Pro Plan',
        price: '₹5100',
        time: '52',
        features: ['Viewing extended match lists', 'Enhanced profile visibility to get more attention', 'Active chat limit: 10 accounts', '6 matches per week','Search and Send Interest options'],
    },
];
const SubscriptionScreen = () => {
    const flatListRef = useRef<FlatList<any>>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width } = Dimensions.get('window');
    
    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.planCard}>
                <Text style={styles.planTitle}>{item.title}</Text>
                <Text style={styles.priceText}>{item.price}</Text>
                <Text style={styles.durationText}>{item.time} Weeks</Text>

                {item.features.map((feature: string, idx: number) => (
                    <View style={styles.feature} key={idx}>
                        <Icon name="check" size={16} color="#fff" />
                        <Text style={styles.featureText}>{feature}</Text>
                    </View>
                ))}

                <TouchableOpacity style={styles.startBtn}>
                    <Text style={styles.startBtnText}>Start Plan →</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />

            {/* Header */}
            <Header headerText="Subscription" isBack />

            {/* Banner */}
            <View style={styles.bannerContainer}>
                <Image
                    source={require('../../../assets/images/subscription-banner.png')}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
                <View style={styles.bannerOverlay}>
                    <View style={styles.discountCircle}>
                        <Text style={styles.discountText}>Save Upto{'\n'}40%</Text>
                    </View>
                    <Text style={styles.bannerText}>Make Your{'\n'}Wedding Memorable</Text>
                </View>
            </View>

            {/* Promo Text */}
            <View style={styles.centerText}>
                <Text style={styles.premiumText}>Go Premium</Text>
                <Text style={styles.subText}>No Commitment. Cancel Anytime.</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={subscriptionData}
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
            {/* Plan Card */}

        </ScrollView>
    );
};

export default SubscriptionScreen;
