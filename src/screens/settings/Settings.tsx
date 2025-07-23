import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/common/ScreenHeader'
import FooterNavigator from '../../components/common/footer'
import { Feather } from '@expo/vector-icons';
import { styles } from './style'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { RootStackParamList } from '../../navigation/RootNavigator'
export default function Settings() {
    const [isVisibleInSearch, setIsVisibleInSearch] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const SettingsItem = ({ title, onPress, showArrow = true }: { title: string; onPress: () => void; showArrow?: boolean; }) => (
        <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
            <Text style={styles.settingsText}>{title}</Text>
            {showArrow && <Feather name="chevron-right" size={18} color="#fff" />}
        </TouchableOpacity>
    );

    const RadioButton = ({ selected, onPress }: { selected: boolean; onPress: () => void; }) => (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
            <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
                {selected && <View style={styles.radioButtonInner} />}
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaProvider>
            <SafeAreaView shouldRasterizeIOS={true} style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#2B2B2B"
                    barStyle='default'
                    showHideTransition='fade'
                />
                <Header headerText='Settings' />
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Options & Settings</Text>
                    </View>

                    {/* Settings Items */}
                    <View style={styles.content}>
                        <SettingsItem
                            title="Partner Preferences"
                            onPress={() => navigation.navigate('PartnerPreference')}
                        />

                        <SettingsItem
                            title="Notifications"
                            onPress={() => navigation.navigate('NotificationSettings')}
                        />

                        <SettingsItem
                            title="Account Settings"
                            onPress={() => navigation.navigate('AccountSettings')}
                        />

                        <SettingsItem
                            title="Help & Support"
                            onPress={() => console.log('Help & Support pressed')}
                        />

                        <SettingsItem
                            title="Upgrade Subscription & Membership"
                            onPress={() => console.log('Upgrade pressed')}
                        />

                        {/* Manual Search Results Section */}
                        <View style={styles.searchSection}>
                            <Text style={styles.sectionTitle}>Want To Be Visible In Manual Search Results</Text>

                            <View style={styles.radioGroup}>
                                <TouchableOpacity
                                    style={styles.radioOption}
                                    onPress={() => setIsVisibleInSearch(true)}
                                >
                                    <RadioButton
                                        selected={isVisibleInSearch}
                                        onPress={() => setIsVisibleInSearch(true)}
                                    />
                                    <Text style={styles.radioText}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.radioOption}
                                    onPress={() => setIsVisibleInSearch(false)}
                                >
                                    <RadioButton
                                        selected={!isVisibleInSearch}
                                        onPress={() => setIsVisibleInSearch(false)}
                                    />
                                    <Text style={styles.radioText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Language Section */}
                        <TouchableOpacity style={styles.languageSection}>
                            <Text style={styles.settingsText}>Language</Text>
                            <View style={styles.languageRight}>
                                <Text style={styles.languageValue}>{selectedLanguage}</Text>
                                <Feather name="chevron-right" size={18} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.termWrapper}>
                            <Text style={styles.termText}>Terms & conditions</Text>
                            <Text style={styles.copyRightText}>Copyright © 2025 Online Matrimony</Text>
                            <Text style={styles.copyRightText}>Version 1.1.0</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

