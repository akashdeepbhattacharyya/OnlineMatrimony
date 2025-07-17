import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useLoader } from '../../context/LoaderContext';

export const LoaderOverlay = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
