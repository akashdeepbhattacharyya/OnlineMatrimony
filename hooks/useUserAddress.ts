import * as Location from 'expo-location';
import { useState } from 'react';

export function useUserAddress() {
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [postalCode, setPostalCode] = useState<string | null>(null);

  // Request permission for the location
  const requestLocationPermission = async () => {
    const permissionResult = await Location.requestForegroundPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      setError('Permission to access location is required!');
      return false;
    }
    return true;
  };

  const getCurrentAddress = async () => {
    setError(null);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    setIsFetchingLocation(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      setIsFetchingLocation(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const [address] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setAddress(address.name || '');
    setCity(address.city || '');
    setRegion(address.region || '');
    setCountry(address.country || '');
    setPostalCode(address.postalCode || '');
    setIsFetchingLocation(false);
  };

  return {
    isFetchingLocation,
    error,
    address,
    city,
    region,
    country,
    postalCode,
    getCurrentAddress,
  };
}
