import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import Header from '../../components/common/ScreenHeader';

const HideDeleteProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />

      {/* Header */}
      <Header headerText="Hide / Delete Profile" isBack />

      {/* Hide Profile Section */}
      
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Hide Profile</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Your Profile Is Currently Visible</Text>
          <TouchableOpacity>
            <Text style={styles.actionText}>Hide</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Feather name="info" size={16} color="#aaa" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            When you hide your profile, you will not be visible on online matrimony.
            You will neither be able to send invitation or messages.
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Delete Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Delete Profile</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Delete Your Profile</Text>
          <TouchableOpacity>
            <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Feather name="info" size={16} color="#aaa" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            You will permanently lose all profile information, match information and
            paid memberships.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HideDeleteProfileScreen;
