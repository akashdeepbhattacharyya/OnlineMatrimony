import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function useImagePicker() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Request permission for the media library
  const requestLibraryPermission = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setError('Permission to access photo library is required!');
      return false;
    }
    return true;
  };

  // Request permission for the camera
  const requestCameraPermission = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      setError('Permission to access the camera is required!');
      return false;
    }
    return true;
  };

  // Open Photo Library
  const pickImage = async () => {
    setError(null);
    const hasPermission = await requestLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Open Camera
  const takePhoto = async () => {
    setError(null);
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return {
    image,
    error,
    pickImage,
    takePhoto,
    clearImage: () => setImage(null),
  };
}
