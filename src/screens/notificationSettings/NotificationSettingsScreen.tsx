import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from '../../components/common/header.component';

const notificationsList = [
    'Message',
    'Profile Updates',
    'New Matches',
    'Notifications',
    'Subscription Renewal',
];

const NotificationSettingsScreen = () => {
    const [toggles, setToggles] = useState(
        notificationsList.reduce((acc, item) => {
            acc[item] = false;
            return acc;
        }, {} as { [key: string]: boolean })
    );

    const toggleSwitch = (key: string) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />
            <Header headerText="Notifications" isBack />
            <ScrollView style={styles.list}>
                {notificationsList.map((label) => (
                    <View key={label} style={styles.item}>
                        <Text style={styles.itemText}>{label}</Text>
                        <Switch
                            trackColor={{ false: '#555', true: '#F85F5F' }}
                            thumbColor="#fff"
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(label)}
                            value={toggles[label]}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default NotificationSettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 10,
    },
    bellIcon: {
        marginTop: 2,
    },
    list: {
        marginTop: 20,
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
    },
});
