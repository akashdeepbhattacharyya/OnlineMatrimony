import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from '../../components/common/ScreenHeader';
import { useAuth } from '../../context/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
const options = [
  'Contact Filters',
  'Hide / Delete Profile',
  'Subscription Renewal',
  'Logout',
];

const AccountSettingsScreen = () => {
  const { logout } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handelOnpress = (label: string) => {
    switch (label) {
      case 'Contact Filters':
        navigation.navigate('ContactFilters');
        break;
      case 'Hide / Delete Profile':
        navigation.navigate('HideDeleteProfile');
        break;
      case 'Subscription Renewal':
        navigation.navigate('Subscription');
        break;
      case 'Logout':
        logout();
        break;
      default:
        console.log(`${label} pressed`);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView shouldRasterizeIOS={true} style={styles.container}>
        <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />

        {/* Header */}
        <Header headerText="Account Settings" isBack />

        {/* Options */}
        <ScrollView>
          {options.map((label, index) => (
            <TouchableOpacity
              key={label}
              style={styles.optionRow}
              onPress={() => handelOnpress(label)}
            >
              <Text style={styles.optionText}>{label}</Text>
              {label !== 'Logout' && (
                <Feather name="chevron-right" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AccountSettingsScreen;

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
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});
