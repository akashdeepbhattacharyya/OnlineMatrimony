import { ImageBackground, StatusBar, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Svg, { Path } from 'react-native-svg'
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { styles } from './style'
import { RootStackParamList } from '../../navigation/RootNavigator';

export default function Onboarding() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleGetOtp = () => {
        navigation.navigate('Login')
    }
    const slideAnim = useRef(new Animated.Value(1000)).current; // Start 100px below

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ImageBackground
                    source={require('../../../assets/images/splashScreen.png')}
                    style={styles.imgContainer}
                    resizeMode='cover'
                >
                    <View style={styles.content}>
                        <View style={{ marginVertical: 80 }}>
                            <Text style={styles.logo}>LOGO</Text>
                            <Text style={styles.tagline}>BRINGING HEARTS TOGETHER</Text>
                        </View>
                        <Animated.View style={[styles.otpButton,{ transform: [{ translateY: slideAnim }] }]}>
                            <TouchableOpacity
                                onPress={handleGetOtp}
                            >
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                    <Text style={styles.otpButtonText}>Get Started</Text>
                                    <Svg width="19" height="15" viewBox="0 0 13 12" fill="white">
                                        <Path d="M12.8527 6.36954L7.84048 11.3573C7.74636 11.451 7.6189 11.5034 7.48612 11.5031C7.35335 11.5027 7.22614 11.4497 7.13248 11.3556C7.03882 11.2614 6.98639 11.134 6.98672 11.0012C6.98704 10.8684 7.0401 10.7412 7.13421 10.6476L11.2913 6.51172L0.498377 6.48532C0.365769 6.48499 0.238721 6.432 0.145183 6.33801C0.0516446 6.24401 -0.00072213 6.1167 -0.000397666 5.98409C-7.32025e-05 5.85149 0.0529159 5.72444 0.146913 5.6309C0.24091 5.53736 0.368216 5.48499 0.500824 5.48532L11.2938 5.51173L7.15695 1.35559C7.06329 1.26148 7.01086 1.13401 7.01118 1.00124C7.01151 0.86846 7.06456 0.741252 7.15868 0.647595C7.2528 0.553938 7.38026 0.501505 7.51304 0.50183C7.64581 0.502155 7.77302 0.555211 7.86668 0.649327L12.8544 5.66155C12.9009 5.70811 12.9377 5.76337 12.9627 5.82418C12.9878 5.88499 13.0006 5.95014 13.0005 6.0159C13.0003 6.08167 12.9872 6.14676 12.9618 6.20744C12.9365 6.26813 12.8994 6.32321 12.8527 6.36954Z" fill="white" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </ImageBackground>
            </View>
        </View >
    )
}

