import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DotedLine from '../../../assets/images/dotedLine.svg';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { styles } from './style';

export default function ProfileSelection() {
    const [profile, setProfile] = useState('Bride');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handelProfile = (profile: string) => {
        setProfile(profile);
        navigation.navigate('Login');
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={styles.content}>
                <View style={{ marginVertical: 80 }}>
                    <Text style={styles.logo}>LOGO</Text>
                    <Text style={styles.tagline}>BRINGING HEARTS TOGETHER</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center' }} >
                    <Text style={styles.textWrapper}>Who am I</Text>
                    <View style={styles.optionsContainer}>
                        <DotedLine width={307} height={163} style={styles.dotedLine} />
                        <View style={styles.brideContainer}>
                            <TouchableOpacity style={[styles.brideCircle, profile === 'Bride' ? styles.activeColor : styles.deActiveColor]} onPress={() => { handelProfile('Bride') }} >
                                <Image
                                    source={require('../../../assets/images/Bride.png')}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', marginTop: 10, gap: 10, justifyContent: 'flex-end' }} >
                                <View style={[profile === 'Bride' && styles.active, profile === 'Bride' && styles.activeColor]} />
                                <Text style={styles.brideLabel}> Bride</Text>
                            </View>
                        </View>
                        <View style={styles.groomContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', marginBottom: 10, gap: 10, justifyContent: 'center' }} >
                                <View style={[profile === 'Groom' && styles.active, profile === 'Groom' && styles.activeColor]} />
                                <Text style={styles.brideLabel}> Groom</Text>
                            </View>
                            <TouchableOpacity style={[styles.groomCircle, profile === 'Groom' ? styles.activeColor : styles.deActiveColor]} onPress={() => { handelProfile('Groom') }}>
                                <Image
                                    source={require('../../../assets/images/Groom.png')} // Replace with your groom dress image
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.groomLabel}>Groom</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

